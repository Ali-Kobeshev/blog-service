import { body } from "express-validator";

export const validatePassword = () => {
   return body("password")
      .escape()
      .trim()
      .isLength({ max: 100, min: 5 })
      .withMessage("Введите парроль корректно");
};
