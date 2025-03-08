import { createListModel } from "../helpers/create-list-model";

export const PostListModel = createListModel(
   "profiles-post-lists",
   "postIdList"
);
export const LikedPostListModel = createListModel(
   "profiles-liked-post-lists",
   "postIdList"
);
export const SubscriberListModel = createListModel(
   "profiles-subscriber-lists",
   "profileIdList"
);
export const SubscriptionsListModel = createListModel(
   "profiles-subscription-lists",
   "profileIdList"
);
