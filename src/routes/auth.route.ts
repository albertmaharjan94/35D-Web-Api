import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { uploads } from "../middlewares/upload.middleware";

let authController = new AuthController();

const router = Router();

router.post("/register", authController.createUser)
router.post("/login", authController.loginUser)

router.get("/whoami", authorizedMiddleware, authController.getUserById)

router.put(
    "/update-profile",
    authorizedMiddleware, // should be logged in
    uploads.single("image"), // optional single profile image
    authController.updateUser
)

router.post(
    "/send-reset-password-email",
    authController.requestPasswordChange
)
// "image" - field name from client side form-data
export default router;