import { Router } from "express";
import { AccountController } from "../controllers/account-controller";
import { param } from "express-validator";
import { loginDataValidator } from "../validators/identity-router-validators";
import { validateEmail } from "../validators/base-validators/email-validadator";
import { validationResultMiddleware } from "../middlewares/validation-result-middleware";

const router = Router();

router.post(
   "/registration",
   loginDataValidator,
   validationResultMiddleware,
   AccountController.registration
);
router.post(
   "/activate/send-link",
   validateEmail("body"),
   validationResultMiddleware,
   AccountController.sendActivateLink
);
router.get(
   "/activate/:email/:code",
   param("code")
      .escape()
      .isLength({ min: 36, max: 36 })
      .withMessage("Неккоректный код активации"),
   validationResultMiddleware,
   AccountController.activate
);
router.post(
   "/login",
   loginDataValidator,
   validationResultMiddleware,
   AccountController.login
);
router.get("/refresh", AccountController.refresh);
router.post("/logout", AccountController.logout);

export default router;
