import { Request, Response } from "express";
import { AdminUserService } from "../../services/admin/user.service";
import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import z from "zod"

let adminUserService = new AdminUserService();
export class AdminUserController {
    async createUser(req: Request, res: Response){
        // Similar to register user 
    }
    async getOneUser(req: Request, res: Response){
        try{
            const userId = req.params.id; // eg: /api/admin/users/:id
            const user = await adminUserService.getOneUser(userId);
            return res.status(200).json(
                {success: true, data: user, message: "User fetched"}
            )
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success: false, message: error.message || "Internal Server Error"}
            ) 
        }
    }
    async getAllUsers(req: Request, res: Response){
        try{
            const users = await adminUserService.getAllUsers();
            return res.status(200).json(
                {success: true, data: users, message: "Users fetched"}
            )
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success: false, message: error.message || "Internal Server Error"}
            ) 
        }
    }
    // continue to other 
}