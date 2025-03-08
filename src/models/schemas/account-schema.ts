import { Schema, model } from "mongoose";
import { AccountDbType } from "../types/account-type";
import { RoleNames } from "../../constants/enums/role-names";
import { SessionsListDbType } from "../types/session-type";

const AccountSchema = new Schema<AccountDbType>({
   email: { type: String, unique: true, required: true },
   profileId: { type: Schema.Types.ObjectId, required: true },
   hashPassword: { type: String, required: true },
   isActivated: { type: Boolean, default: false, required: true },
   roles: {
      type: [String],
      default: [RoleNames.unactivatedUser],
      required: true,
   },
   sessionsListId: { type: Schema.Types.ObjectId, required: true },
});

const SessionsListSchema = new Schema<SessionsListDbType>({
   sessions: {
      type: [
         {
            hashToken: String,
            createdAt: Date,
         },
      ],
      default: [],
      required: true,
   },
});

export const SessionsListModel = model(
   "account-session-lists",
   SessionsListSchema
);

export const AccountModel = model("accounts", AccountSchema);
