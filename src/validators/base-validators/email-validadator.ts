import { body, query } from "express-validator";

export const validateEmail = (location = "body") => {
   const validator = location === "body" ? body : query;
   return validator("email")
      .escape()
      .trim()
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 100 })
      .withMessage("Введите корректный адрес электронной почты");
};
