import { Types } from "mongoose";
import { RoleType } from "./role-type";
import { RoleNames } from "../../constants/enums/role-names";

export type AccountDbType = {
   _id: Types.ObjectId;
   profileId: Types.ObjectId;
   email: string;
   hashPassword: string;
   isActivated: boolean;
   roles: RoleNames[];
   sessionsListId: Types.ObjectId;
};

export type AccountInputType = {
   email: string;
   password: string;
};

export type AccountOutputType = {
   _id: Types.ObjectId;
   profileId: Types.ObjectId;
   email: string;
   isActivated: boolean;
   roles: RoleType[];
};
