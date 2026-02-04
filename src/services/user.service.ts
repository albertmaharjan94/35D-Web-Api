import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs";
import { sendEmail } from "../configs/email";

let userRepository = new UserRepository();
export class UserService {
    async registerUser(userData: CreateUserDto){ // userData passed from controller
        // business logic, e.g. check if user exists, hash password, etc.
        const checkEmail = await userRepository.getUserByEmail(userData.email);
        if(checkEmail){ // if found instance, duplicate email
            throw new HttpError(409, "Email already in use");
        }
        const checkUsername = await userRepository.getUserByUsername(userData.username);
        if(checkUsername){
            throw new HttpError(403, "Username already in use");
        }
        // donot store plain password - hash/encrypt for security
        const hashedPassword = await bcryptjs.hash(userData.password, 10); // 10 complexity
        userData.password = hashedPassword; // replace with hashed password
        const newUser = await userRepository.createUser(userData);
        return newUser;
    }

    async loginUser(loginData: LoginUserDto){
        const user = await userRepository.getUserByEmail(loginData.email);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        const validPassword = await bcryptjs.compare(loginData.password, user.password);
        // compare plain password with hashed password
        // not loginData.password (client) == user.password (database)
        if(!validPassword){
            throw new HttpError(401, "Invalid credentials");
        }
        const payload = { // what to store in token
            id: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }); // 30 days
        return { token, user }
    }

    async getUserById(userId: string) {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }
    async updateUser(userId: string, data: UpdateUserDto) { 
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        if(user.email !== data.email){
            const checkEmail = await userRepository.getUserByEmail(data.email!);
            if(checkEmail){
                throw new HttpError(409, "Email already in use");
            }
        }
        if(user.username !== data.username){
            const checkUsername = await userRepository.getUserByUsername(data.username!);
            if(checkUsername){
                throw new HttpError(403, "Username already in use");
            }
        }
        if(data.password){
            const hashedPassword = await bcryptjs.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await userRepository.updateUser(userId, data);
        return updatedUser;
    }

    async sendResetPasswordEmail(email?: string) {
        const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
        if (!email) {
            throw new HttpError(400, "Email is required");
        }
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiry
        const resetLink = `${CLIENT_URL}/reset-password?token=${token}`;
        const html = `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`;
        await sendEmail(user.email, "Password Reset", html);
        return user;
    }
    async resetPassword(token?: string, newPassword?: string) {
        try {
            if (!token || !newPassword) {
                throw new HttpError(400, "Token and new password are required");
            }
            const decoded: any = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id;
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new HttpError(404, "User not found");
            }
            const hashedPassword = await bcryptjs.hash(newPassword, 10);
            await userRepository.updateUser(userId, { password: hashedPassword });
            return user;
        } catch (error) {
            throw new HttpError(400, "Invalid or expired token");
        }
    }



}