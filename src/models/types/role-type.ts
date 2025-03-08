import { RoleNames } from "../../constants/enums/role-names";
import { PermissionType } from "./permission-type";

export type RoleType = {
   role: RoleNames;
   permissions: PermissionType[];
   inheritsFrom?: RoleNames[];
};
