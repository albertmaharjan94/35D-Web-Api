import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";

const blogService = new BlogService();
interface QueryParams {
    page?: string;
    size?: string;
    search?: string;
}
export class BlogController {
    async createBlog(req: Request, res: Response) {
        try {
            const userId = req.user?._id; // req.user is populated by auth middleware
            req.body.authorId = userId; // set authorId from authenticated user
            // DTO implementation can be added here for validation
            const blog = await blogService.createBlog(req.body);
            return res.status(201).json({
                success: true,
                data: blog,
                message: "Blog created successfully"
            });
        } catch (err: Error | any) {
            return res.status(err.statusCode || 500)
                .json({ message: err.message || "Internal Server Error" });
        }
    }
    async getAllBlogs(req: Request, res: Response) {
        try {
            const { page, size, search }: QueryParams = req.query;

            const {blogs, pagination} = await blogService.getAllBlogs(
                { page, size, search }
            );
            return res.status(200).json({
                success: true,
                data: blogs,
                pagination,
                message: "Blogs fetched successfully"
            });
        } catch (err: Error | any) {
            return res.status(err.statusCode || 500)
                .json({ message: err.message || "Internal Server Error" });
        }
    }

    async deleteOneBlog(req: Request, res: Response) {
        try{
            const blogId = req.params.id;
            const deleted = await blogService.deleteBlog(blogId);
            return res.status(200).json({
                success: true,
                data: deleted,
                message: "Blog deleted successfully"
            });
        }catch (err: Error | any) {
            return res.status(err.statusCode || 500)
                .json({ message: err.message || "Internal Server Error" });
        }
    }
}