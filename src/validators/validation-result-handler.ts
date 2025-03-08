import { Request } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-errors";

export function validationResultHandler(req: Request) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      throw ApiError.BadRequest("ошибка при валидации", errorsArray as []);
   }
}
