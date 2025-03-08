import { Schema, model } from "mongoose";
import { ProfileDbType } from "../types/profile-type";

const ProfileSchema = new Schema<ProfileDbType>({
   name: { type: String, required: true, default: "New user" },
   avatar: {
      type: Object,
      required: true,
      default: {
         link: null,
         public_id: null,
      },
   },
   postListId: { type: Schema.Types.ObjectId, required: true },
   registrationDate: { type: Number, required: true, default: Date.now },
   likedPostListId: { type: Schema.Types.ObjectId, required: true },
   subscriberListId: { type: Schema.Types.ObjectId, required: true },
   subscriptionsListId: { type: Schema.Types.ObjectId, required: true },
});

export const ProfileModel = model("profiles", ProfileSchema);
