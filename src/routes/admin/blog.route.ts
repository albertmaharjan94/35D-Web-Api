import { BlogController } from "../../controllers/blog.controller";
import  { Router } from "express";
import { authorizedMiddleware, adminMiddleware } from "../../middlewares/authorized.middleware";

const router = Router();
const blogController = new BlogController();

router.use(authorizedMiddleware);
router.use(adminMiddleware);

router.get("/" ,
    //    authorizedMiddleware, 
    blogController.getAllBlogs);

router.delete("/:id", blogController.deleteOneBlog);

export default router;