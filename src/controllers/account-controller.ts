import { NextFunction, Request, Response } from "express";
import { AccountService } from "../services/account-service";

export class AccountController {
   static async registration(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         const accountData = await AccountService.registration(email, password);
         res.cookie("refreshToken", accountData.refreshToken, {
            httpOnly: true,
            sameSite: "lax", // если фронт и бэк на разных портам
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });
         res.status(200).json({
            accountData: accountData.account,
            profile: accountData.createdProfile,
            accessToken: accountData.accessToken,
         });
      } catch (error) {
         console.error(error);
         next(error);
      }
   }

   static async sendActivateLink(
      req: Request,
      res: Response,
      next: NextFunction
   ) {
      try {
         const result = await AccountService.sendActivationMail(req.body.email);
         res.status(200).json(result);
      } catch (error) {
         console.error(error);
         next(error);
      }
   }
   static async activate(req: Request, res: Response, next: NextFunction) {
      try {
         const activatedAccount = await AccountService.activate(
            req.params.email,
            req.params.code
         );
         res.cookie("refreshToken", activatedAccount.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });
         res.status(200).json({
            accountData: activatedAccount.account,
            accessToken: activatedAccount.accessToken,
         });
      } catch (error) {
         console.error(error);
         next(error);
      }
   }
   static async login(req: Request, res: Response, next: NextFunction) {
      try {
         const accountData = await AccountService.login(
            req.body.email,
            req.body.password
         );
         res.cookie("refreshToken", accountData.refreshToken, {
            httpOnly: true,
            sameSite: "lax", // если фронт и бэк на разных портам
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });
         res.status(200).json({
            accountData: accountData.account,
            profile: accountData.profile,
            accessToken: accountData.accessToken,
         });
      } catch (error) {
         console.error(error);
         next(error);
      }
   }
   static async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { refreshToken } = req.cookies;
         await AccountService.logout(refreshToken);
         res.status(200).json({
            message: "Токен занесен в черный список",
         });
      } catch (error) {
         console.error(error);
         next(error);
      }
   }
   static async refresh(req: Request, res: Response, next: NextFunction) {
      try {
         const { refreshToken } = req.cookies;
         const result = await AccountService.refresh(refreshToken);
         res.cookie("refreshToken", result.tokens.refreshToken, {
            httpOnly: true,
            sameSite: "lax", // если фронт и бэк на разных портам
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });
         res.status(200).json({
            message: "Заебись",
            accessToken: result.tokens.accessToken,
         });
      } catch (error) {
         console.error(error);
         next(error);
      }
   }
}
