import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

export class CloudinaryAdapter {
   config;
   autoOptimizeParams;
   autoCropParams;

   constructor() {
      if (
         !process.env.CLOUDINARY_CLOUD_NAME ||
         !process.env.CLOUDINARY_API_KEY ||
         !process.env.CLOUDINARY_API_SECRET
      ) {
         throw new Error("Где переменные окружения, Лебовски?");
      }

      this.config = cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      this.autoOptimizeParams = {
         fetch_format: "auto",
         quality: "auto",
      };

      this.autoCropParams = {
         crop: "auto",
         gravity: "auto",
         width: 500,
         height: 500,
      };
   }

   async uploadAndGetImageAvatarUrl(imgPath: string) {
      try {
         const id = uuidv4();

         await cloudinary.uploader.upload(imgPath, {
            public_id: id,
         });

         const finalUrl = cloudinary.url(id, {
            ...this.autoOptimizeParams,
            ...this.autoCropParams,
         });

         return {
            link: finalUrl,
            public_id: id,
         };
      } catch (error) {
         throw error;
      }
   }

   async deleteImageAvatar(id: string) {
      try {
         const result = await cloudinary.uploader.destroy(
            id,
            (result) => result
         );
         return result.result === "ok";
      } catch (error) {
         throw error;
      }
   }

   getImageAvatarUrl(id: string) {
      return cloudinary.url(id, {
         ...this.autoOptimizeParams,
         ...this.autoCropParams,
      });
   }
}
