import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-errors";

export function validationResultMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const errorsArray = errors.array();
         throw ApiError.BadRequest("ошибка при валидации", errorsArray as []);
      }
      next();
   } catch (error) {
      next(error);
   }
}
