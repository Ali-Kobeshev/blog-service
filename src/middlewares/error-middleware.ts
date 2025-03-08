import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-errors";

export async function errorMiddleware(
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.error(err);
   if (err instanceof ApiError) {
      res.status(err.status).json({ message: err.message, errors: err.errors });
      return;
   }

   res.status(500).json({ message: "Непредвиденная ошибка" });
}
