import { ClientSession } from "mongodb";
import { ProfileModel } from "../models/schemas/profile-schema";
import {
   LikedPostListModel,
   PostListModel,
   SubscriberListModel,
   SubscriptionsListModel,
} from "../models/schemas/profile-db-ref-schemas";

export class ProfileRepository {
   static async create(session: ClientSession) {
      try {
         const postList = new PostListModel({});
         await postList.save({ session });

         const likedPostList = new LikedPostListModel({});
         await likedPostList.save({ session });

         const subscriberList = new SubscriberListModel({});
         await subscriberList.save({ session });

         const subscriptionsList = new SubscriptionsListModel({});
         await subscriptionsList.save({ session });

         const newProfile = new ProfileModel({
            postListId: postList._id,
            likedPostListId: likedPostList._id,
            subscriberListId: subscriberList._id,
            subscriptionsListId: subscriptionsList._id,
         });
         await newProfile.save({ session });

         return newProfile;
      } catch (error) {
         console.error("ошибка транзакции в репозитории профиля");
         throw error;
      }
   }
}
