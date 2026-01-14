import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";
import { authorizedMiddleware, adminMiddleware } 
    from "../../middlewares/authorized.middleware";
import { Request, Response } from "express";
let adminUserController = new AdminUserController();

const router = Router();

// test routes
router.get(
    "/test",
    authorizedMiddleware,
    adminMiddleware,
    (req: Request, res: Response) => {
        res.status(200).json({ success: true, message: "Welcome to admin" });
    }
)

// 5 common api endpoints
router.post("/", authorizedMiddleware, adminUserController.createUser);
router.get("/:id", adminUserController.getOneUser);
router.get("/", adminUserController.getAllUsers);
// router.put("/:id", adminUserController.updateUser);
// router.delete("/:id", adminUserController.deleteUser);


// Task complete the other endpoints
export default router;