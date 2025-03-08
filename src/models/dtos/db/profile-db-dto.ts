import { ProfileInputType } from "../../types/profile-type";
import { AvatarDbType } from "../../types/profile-type";

export class ProfileDbDto {
   name?: string;
   avatar?: AvatarDbType;

   constructor(model: ProfileInputType, avatar?: AvatarDbType) {
      if (model.name) {
         this.name = model.name;
      }
      if (avatar) {
         this.avatar = {
            link: avatar.link,
            public_id: avatar.public_id,
         };
      }
   }
}
