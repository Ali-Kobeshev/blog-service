import {
   AccountModel,
   SessionsListModel,
} from "../models/schemas/account-schema";
import { Types, ClientSession } from "mongoose";

export class AccountRepository {
   static async create(
      email: string,
      hashPassword: string,
      profileId: Types.ObjectId,
      session: ClientSession
   ) {
      try {
         const sessions = new SessionsListModel({});
         await sessions.save({ session });

         const createdAccount = new AccountModel({
            email,
            profileId,
            hashPassword,
            sessionsListId: sessions._id,
         });
         await createdAccount.save({ session });

         return createdAccount;
      } catch (error) {
         console.error("ошибка транзакции в репозитории аккаунта");
         throw error;
      }
   }
}
