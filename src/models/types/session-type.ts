import { Types } from "mongoose";

export type SessionDbType = {
   hashToken: string;
   createdAt: Date;
};

export type SessionsListDbType = {
   _id: Types.ObjectId;
   sessions: SessionDbType[];
};
