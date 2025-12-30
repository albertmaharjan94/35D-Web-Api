import { UserRepository } from "../../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../../errors/http-error";
let userRepository = new UserRepository();
export class AdminUserService {
    async createUser(userData: CreateUserDto){ 
        // same as registerUser
    }
    async getAllUsers() {
        const users = await userRepository.getAllUsers();
        return users;
    }
    async getOneUser( userId: string) {
        const user = await userRepository.getUserById(userId);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        return user;
    }
    async deleteOneUser( userId: string) {
        const user = await userRepository.getUserById(userId);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        const result = await userRepository.deleteUser(userId); // boolean | null
        if(!result){
            throw new HttpError(500, "Failed to delete user");
        }
        return result;
    }

    async updateOneUser(userId: string, updateData: UpdateUserDto){
        const user = await userRepository.getUserById(userId);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        // more logic, check if email exists
        const updatedUser = await userRepository.updateUser(userId, updateData);
        if(!updatedUser){
            throw new HttpError(500, "Failed to update user");
        }
        return updatedUser;
    }
}