import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";

let adminUserController = new AdminUserController();

const router = Router();

// 5 common api endpoints
router.post("/", adminUserController.createUser);
router.get("/:id", adminUserController.getOneUser);
router.get("/", adminUserController.getAllUsers);
// router.put("/:id", adminUserController.updateUser);
// router.delete("/:id", adminUserController.deleteUser);


// Task complete the other endpoints
export default router;