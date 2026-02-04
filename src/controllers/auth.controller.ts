import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/user.dto';
import z from "zod";
let userService = new UserService();
export class AuthController {
    async createUser(req: Request, res: Response) {
        try {
            const parsedData = CreateUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                )
            }
            const newUser = await userService.registerUser(parsedData.data);
            return res.status(201).json(
                { success: true, message: 'Register Successful', data: newUser }
            )
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            )
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const parsedData = LoginUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                )
            }
            const { token, user } = await userService.loginUser(parsedData.data);
            return res.status(200).json(
                { success: true, message: "Login successful", data: user, token }
            )
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            )
        }
    }

    async getUserById(req: Request, res: Response) {
        try{
            const userId = req.user?._id;
            if(!userId){
                return res.status(400).json(
                    { success: false, message: "User ID not provided" }
                )
            }
            const user = await userService.getUserById(userId);
            return res.status(200).json(
                { success: true, message: "User fetched successfully", data: user }
            )
        }catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            )
        }
    }

    async updateUser(req: Request, res: Response) {
        try{
            const userId = req.user?._id; // from middleware
            if(!userId){
                return res.status(400).json(
                    { success: false, message: "User ID not provided" }
                )
            }
            const parsedData = UpdateUserDto.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json(
                    { success: false, message: z.prettifyError(parsedData.error) }
                )
            }
            if(req.file){ // if new image uploaded through multer
                parsedData.data.imageUrl = `/uploads/${req.file.filename}`;
            }
            const updatedUser = await userService.updateUser(userId, parsedData.data);
            return res.status(200).json(
                { success: true, message: "User updated successfully", data: updatedUser }
            )
        }catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            )
        }
    }

    async requestPasswordChange(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await userService.sendResetPasswordEmail(email);
            return res.status(200).json(
                { success: true, 
                    data: user,
                    message: "Password reset email sent" }
            )
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            )
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {

           const token = req.params.token;
            const { newPassword } = req.body;
            await userService.resetPassword(token, newPassword);
            return res.status(200).json(
                { success: true, message: "Password has been reset successfully." }
            );
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json(
                { success: false, message: error.message || "Internal Server Error" }
            );
        }
    }
}