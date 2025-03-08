import mongoose from "mongoose";
import { ProfileDbType } from "../models/types/profile-type";
import { ProfileRepository } from "../repositories/profile-repo";
import { AccountDbType } from "../models/types/account-type";
import { AccountRepository } from "../repositories/account-repo";

export async function accountProfileTransaction(
   email: string,
   hashPassword: string
) {
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
      const createdProfile: ProfileDbType = await ProfileRepository.create(
         session
      );
      const createdAccount: AccountDbType = await AccountRepository.create(
         email,
         hashPassword,
         createdProfile._id,
         session
      );

      await session.commitTransaction();
      return { createdAccount, createdProfile };
   } catch (error) {
      await session.abortTransaction();
      console.error("откат транзакции по созданию профиля и аккаунта");
      throw error;
   } finally {
      session.endSession();
   }
}
