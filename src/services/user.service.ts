import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs";

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
}