import { Types } from "mongoose";

export type AvatarDbType = {
   link: string | null;
   public_id: string | null;
};

export type ProfileDbType = {
   _id: Types.ObjectId;
   name: string;
   avatar: AvatarDbType;
   postListId: Types.ObjectId;
   registrationDate: number;
   likedPostListId: Types.ObjectId;
   subscriberListId: Types.ObjectId;
   subscriptionsListId: Types.ObjectId;
};

export type ProfileInputType = {
   _id: string;
   name: string;
};
