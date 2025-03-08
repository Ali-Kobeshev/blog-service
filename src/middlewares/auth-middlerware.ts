import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-errors";
import { TokenService } from "../services/token-service";
import { AccountOutputType } from "../models/types/account-type";

export async function authMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
         throw ApiError.BadRequest("1");
         //throw ApiError.UnauthorizedError();
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
         throw ApiError.BadRequest("2");
         //throw ApiError.UnauthorizedError();
      }
      //ебучая либа jwt кидает ошибку 500 поэтому у нас try catch внутри другого try catch
      try {
         TokenService.validateAccessToken(accessToken);
      } catch (e) {
         //throw ApiError.UnauthorizedError();
         throw ApiError.BadRequest("3");
      }
      const accountData: AccountOutputType =
         TokenService.decodeToken(accessToken);
      req.body.accountData = accountData;
      next();
   } catch (error) {
      next(error);
   }
}
