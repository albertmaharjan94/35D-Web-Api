import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
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
}