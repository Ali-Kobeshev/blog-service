import { roles } from "../../../constants/roles";
import { AccountDbType } from "../../types/account-type";
import { RoleType } from "../../types/role-type";

export class AccountDto {
   accountId;
   profileId;
   email;
   isActivated;
   roles: RoleType[];

   constructor(model: AccountDbType) {
      this.accountId = model._id;
      this.profileId = model.profileId;
      this.email = model.email;
      this.isActivated = model.isActivated;
      this.roles = this.getRoles(model.roles);
   }

   getRoles(dbRoles: string[]) {
      return dbRoles.map((strRole) => {
         const foundRole = roles.find((role) => role.role === strRole);
         if (!foundRole) {
            throw new Error(`Роль ${strRole} не найдена в списке ролей`);
         }
         return foundRole;
      });
   }
}
