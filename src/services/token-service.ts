import jwt from "jsonwebtoken";
import { ApiError } from "../exceptions/api-errors";
import { AccountOutputType } from "../models/types/account-type";

export class TokenService {
   static generateTokens(payload: AccountOutputType) {
      const accessToken = jwt.sign(
         payload,
         process.env.JWT_ACCESS_SECRET as string,
         {
            expiresIn: 60 * 15,
         }
      );
      const refreshToken = jwt.sign(
         payload,
         process.env.JWT_REFRESH_SECRET as string,
         {
            expiresIn: 60 * 60 * 24 * 30,
         }
      );

      return { accessToken, refreshToken };
   }
   static validateAccessToken(token: string) {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
   }
   static validateRefreshToken(token: string) {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
   }
   static decodeToken(token: string) {
      const decoded = jwt.decode(token) as AccountOutputType;
      if (decoded) {
         return decoded;
      } else {
         throw ApiError.UnauthorizedError();
      }
   }
}
