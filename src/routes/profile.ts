import { Router } from "express";
import { ProfileController } from "../controllers/profile-controller";
import { authMiddleware } from "../middlewares/auth-middlerware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads");
      cb(null, uploadPath);
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
   },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/get/:id", ProfileController.getProfile);
router.put(
   "/update/presentation",
   upload.single("file"),
   authMiddleware,
   ProfileController.updatePresentation
);
router.get("/get/subscription-list/:id");
router.put("/update/subscribers");

export default router;
