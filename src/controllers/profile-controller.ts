import path from "path";
import { ApiError } from "../exceptions/api-errors";
import { AccountOutputType } from "../models/types/account-type";
import { ProfileInputType } from "../models/types/profile-type";
import { ProfileService } from "../services/profile-service";
import { Request, Response, NextFunction } from "express";
import { deleteFile } from "../utils/delete-file";
import { SubscriptionsListModel } from "../models/schemas/profile-db-ref-schemas";

export class ProfileController {
   static async updatePresentation(
      req: Request,
      res: Response,
      next: NextFunction
   ) {
      try {
         const inputModel = req.body as ProfileInputType;
         const decodedAccessToken = req.body.accountData as AccountOutputType;

         const file = req.file;
         const filePath = file
            ? path.join(__dirname, "../uploads", file.filename)
            : null;

         const updatedProfile = await ProfileService.updatePresentation(
            inputModel,
            filePath,
            decodedAccessToken
         );

         filePath ? deleteFile(filePath) : null;

         res.status(200).json(updatedProfile);
      } catch (error) {
         next(error);
      }
   }

   static async getProfile(req: Request, res: Response, next: NextFunction) {
      try {
         const id = req.params.id;
         const profile = await ProfileService.getProfile(id);
         res.status(200).json(profile);
      } catch (error) {
         next(error);
      }
   }

   static async getSubsciptions(
      req: Request,
      res: Response,
      next: NextFunction
   ) {
      try {
         const id = req.params.id;
         const finded = await SubscriptionsListModel.findById(id);
         if (finded) {
            res.status(200).json(finded);
         } else {
            throw ApiError.NotFound("не найден список подписок");
         }
      } catch (error) {
         next(error);
      }
   }

   static async updateSubscribers(
      req: Request,
      res: Response,
      next: NextFunction
   ) {}
}
