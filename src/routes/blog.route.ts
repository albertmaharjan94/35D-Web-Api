import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
const router = Router();
const blogController = new BlogController();

router.post(
    "/",
    authorizedMiddleware,
    blogController.createBlog
)

router.get(
    "/",
    blogController.getAllBlogs
)

export default router;