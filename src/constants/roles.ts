import { RoleNames } from "./enums/role-names";
import { RoleType } from "../models/types/role-type";

const { unactivatedUser, activatedUser } = RoleNames;

export const roles: RoleType[] = [
   {
      role: unactivatedUser,
      permissions: [
         {
            permission: "read",
            scopes: ["public-content"],
         },
      ],
   },
   {
      role: activatedUser,
      permissions: [
         {
            permission: "create",
            scopes: ["own-content"],
         },
         {
            permission: "update",
            scopes: ["own-content"],
         },
         {
            permission: "delete",
            scopes: ["own-content"],
         },
         {
            permission: "read",
            scopes: ["public-content"],
         },
      ],
   },
];
