import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AccountModel } from "../models/schemas/account-schema";
import { EmailAdapter } from "../adapters/email-adapter";
import { TokenService } from "./token-service";
import { AccountDto } from "../models/dtos/client/account-dto";
import { ApiError } from "../exceptions/api-errors";
import { accountProfileTransaction } from "../mongo-transactions/account-profile";
import { RoleNames } from "../constants/enums/role-names";
import { SessionService } from "./session-service";
import { ProfileModel } from "../models/schemas/profile-schema";

const activateLinkCodes: any = {};

export class AccountService {
   static async registration(email: string, password: string) {
      const candidate = await AccountModel.findOne({ email });
      if (candidate) {
         throw ApiError.BadRequest(
            `Пользователь с адресом ${email} уже существует`
         );
      }
      const hashPassword = await bcrypt.hash(password, 5);

      const { createdAccount, createdProfile } =
         await accountProfileTransaction(email, hashPassword);

      const accountDto = { ...new AccountDto(createdAccount) };
      const tokens = TokenService.generateTokens(accountDto);

      await SessionService.createNewSession(
         tokens.refreshToken,
         createdAccount
      );

      return { createdProfile, account: accountDto, ...tokens };
   }
   static upsertActivationLink(email: string) {
      const linkUuid = uuidv4();
      const link = `${process.env.API_URL}/identity/activate/${email}/${linkUuid}`;
      activateLinkCodes[email] = linkUuid;
      setTimeout(() => {
         delete activateLinkCodes[email];
      }, 120000);

      return link;
   }
   static async sendActivationMail(email: string) {
      const emailAdapter = new EmailAdapter();
      const link = this.upsertActivationLink(email);
      await emailAdapter.sendActivationMail(email, link);

      return true;
   }
   static async activate(email: string, code: string) {
      if (activateLinkCodes[email] === code) {
         const account = await AccountModel.findOne({ email });

         if (account) {
            account.isActivated = true;
            account.roles = account.roles.filter(
               (role) => role !== RoleNames.unactivatedUser
            );
            account.roles.push(RoleNames.activatedUser);
            await account.save();
         } else {
            throw ApiError.NotFound("Некорректный адрес почты");
         }

         const accountDto = { ...new AccountDto(account) };
         const tokens = TokenService.generateTokens(accountDto);

         await SessionService.createNewSession(tokens.refreshToken, account);

         return { account: accountDto, ...tokens };
      } else {
         throw ApiError.NotFound("Ссылка не найдена");
      }
   }
   static async login(email: string, password: string) {
      const account = await AccountModel.findOne({ email });
      if (!account) {
         throw ApiError.NotFound("Аккаунт с такой почтой не найден");
      }
      const hashPassword = account.hashPassword;
      await bcrypt.compare(password, hashPassword).then((result) => {
         if (!result) {
            throw ApiError.BadRequest("Не верный пароль");
         }
      });
      const accountDto = { ...new AccountDto(account) };
      const tokens = TokenService.generateTokens(accountDto);

      await SessionService.createNewSession(tokens.refreshToken, account);

      const profile = await ProfileModel.findOne({
         _id: account.profileId,
      });
      if (!profile) {
         throw ApiError.NotFound("Профиль не найден");
      }

      return { profile, account: accountDto, ...tokens };
   }
   static async logout(token: string) {
      const isValidated = TokenService.validateRefreshToken(token);
      if (isValidated) {
         return true;
      } else {
         throw ApiError.UnauthorizedError;
      }
   }
   static async refresh(token: string) {
      if (TokenService.validateRefreshToken(token)) {
         const decoded = TokenService.decodeToken(token);
         const email = decoded.email;
         const account = await AccountModel.findOne({ email });
         if (account) {
            const prolongationResult = await SessionService.prolongationSession(
               account,
               token
            );
            return prolongationResult;
         } else {
            throw ApiError.NotFound("Аккаунт не найден");
         }
      } else {
         throw ApiError.UnauthorizedError();
      }
   }
}
