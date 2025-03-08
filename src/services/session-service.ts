import bcrypt from "bcrypt";
import { SessionsListModel } from "../models/schemas/account-schema";
import { AccountDbType } from "../models/types/account-type";
import { TokenService } from "./token-service";
import { AccountDto } from "../models/dtos/client/account-dto";
import { SessionDbType } from "../models/types/session-type";
import { ApiError } from "../exceptions/api-errors";

export class SessionService {
   static async createNewSession(refresh: string, dbAccount: AccountDbType) {
      const hashRefresh = await bcrypt.hash(refresh, 2);
      const sessionListItem = {
         hashToken: hashRefresh,
         createdAt: Date.now(),
      };

      await SessionsListModel.updateOne(
         { _id: dbAccount.sessionsListId },
         {
            $push: { sessions: sessionListItem },
         }
      );
   }

   static async prolongationSession(dbAccount: AccountDbType, refresh: string) {
      const sessionDbList = await SessionsListModel.findById(dbAccount._id);
      if (sessionDbList) {
         const sessionList = sessionDbList.sessions;
         const clearedList = sessionList.filter((session) => {
            const sessionDate = new Date(session.createdAt).getTime();
            return Date.now() - sessionDate <= 30 * 24 * 60 * 60 * 1000; //30 days
         });

         let matchedIndex = -1;
         for (let i = 0; i < clearedList.length; i++) {
            const isMatch = await bcrypt.compare(
               refresh,
               clearedList[i].hashToken
            );
            if (isMatch) {
               matchedIndex = i;
               break;
            }
         }

         if (matchedIndex !== -1) {
            const payload = { ...new AccountDto(dbAccount) };
            const newTokens = TokenService.generateTokens(payload);
            const newHashRefresh = await bcrypt.hash(newTokens.refreshToken, 2);
            const prolongatedSession: SessionDbType = {
               hashToken: newHashRefresh,
               createdAt: new Date(),
            };
            clearedList[matchedIndex] = prolongatedSession;
            await SessionsListModel.updateOne(
               { _id: dbAccount._id },
               { $set: { sessions: clearedList } }
            );

            return { tokens: newTokens, accountDto: payload };
         } else {
            throw ApiError.UnauthorizedError();
         }
      } else {
         throw Error("Список сессии не найден");
      }
   }
}
