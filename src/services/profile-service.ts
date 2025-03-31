import { ProfileModel } from "../models/schemas/profile-schema";
import { ProfileInputType } from "../models/types/profile-type";
import { AccountOutputType } from "../models/types/account-type";
import { ProfileDbDto } from "../models/dtos/db/profile-db-dto";
import { ApiError } from "../exceptions/api-errors";
import { CloudinaryAdapter } from "../adapters/cloudinary-adapter";
import { SubscriptionsListModel } from "../models/schemas/profile-db-ref-schemas";
import { ProfileDbType } from "../models/types/profile-type";

export class ProfileService {
   static async updatePresentation(
      model: ProfileInputType,
      avatarPath: string | null,
      decodedAccess: AccountOutputType
   ) {
      const cloudinaryAdapter = new CloudinaryAdapter();
      const newAvatar = avatarPath
         ? await cloudinaryAdapter.uploadAndGetImageAvatarUrl(avatarPath)
         : undefined;

      const profileDbDto = new ProfileDbDto(model, newAvatar);
      const profile = await ProfileModel.findOneAndUpdate(
         { _id: decodedAccess.profileId },
         profileDbDto,
         { new: false }
      );

      if (!profile) {
         throw ApiError.NotFound("профиль не найден");
      }

      if (newAvatar) {
         const oldAvatarsId = profile.avatar.public_id;
         if (oldAvatarsId) {
            await cloudinaryAdapter.deleteImageAvatar(oldAvatarsId);
         }
      }
      //мы здесь сливаем объекты чтобы не делать лишний запрос за актуальным профилем
      const newProfile = { ...profile.toObject(), ...profileDbDto };
      return newProfile;
   }
   static async getProfile(id: string) {
      const finded = await ProfileModel.findById(id);
      if (!finded) {
         throw ApiError.NotFound("профиль не найден");
      }
      return finded;
   }
   static async updateSubscriptionList(
      subscriberProfile: ProfileDbType,
      targetProfileId: string
   ) {
      //start initialization data
      //target profile
      const targetProfile: ProfileDbType | null = await ProfileModel.findById(
         targetProfileId
      );
      if (!targetProfile) {
         throw ApiError.NotFound("профиль не найден");
      }
      //subscriptions list
      const subscriptionsList = await SubscriptionsListModel.findById(
         targetProfile.subscriptionsListId
      );
      if (!subscriptionsList) {
         throw ApiError.NotFound("список подписок не найден");
      }
      //end initialization data

      //subsribing
      const isCurrentlySubscriber = subscriptionsList.profileIdList.indexOf(
         subscriberProfile._id
      );
      if (isCurrentlySubscriber > -1) {
         await SubscriptionsListModel.findByIdAndUpdate(
            { _id: targetProfile.subscriptionsListId },
            {
               $pull: {
                  profileIdList:
                     subscriptionsList.profileIdList[isCurrentlySubscriber],
               },
            }
         );
      } else {
         await SubscriptionsListModel.findByIdAndUpdate(
            { _id: targetProfile.subscriptionsListId },
            { $push: { profileIdList: subscriberProfile._id } }
         );
      }
      //end subsribing
   }
}
