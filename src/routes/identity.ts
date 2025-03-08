import { Router } from "express";
import { AccountController } from "../controllers/account-controller";
import { param } from "express-validator";
import { loginDataValidator } from "../validators/identity-router-validators";
import { validateEmail } from "../validators/base-validators/email-validadator";

const router = Router();

router.post(
   "/registration",
   loginDataValidator,
   AccountController.registration
);
router.post(
   "/activate/send-link",
   validateEmail("body"),
   AccountController.sendActivateLink
);
router.get(
   "/activate/:email/:link",
   param("link")
      .escape()
      .isLength({ min: 36, max: 36 })
      .withMessage("Неккоректный код активации"),
   AccountController.activate
);
router.post("/login", loginDataValidator, AccountController.login);
router.post("/logout", AccountController.logout);
router.get("/refresh", AccountController.refresh);

export default router;
