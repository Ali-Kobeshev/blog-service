import { body } from "express-validator";
import { validateEmail } from "./base-validators/email-validadator";
import { validatePassword } from "./base-validators/password-validator";

export const loginDataValidator = [validateEmail("body"), validatePassword()];
