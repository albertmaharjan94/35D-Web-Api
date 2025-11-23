import { CreateUserDto, UserResponseDto } from "../dtos/user.dto";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface";

export class UserService {
    // Dependency Injection
    constructor(private userRepository: UserRepositoryInterface) {}

    async registerUser(userData: CreateUserDto): Promise<UserResponseDto> {
        // business logic
        const newUser = await this.userRepository.createUser(userData);
        // validation after query if needed
        // .. if duplicate found, throw error
        // map and transform 
        const respose : UserResponseDto = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email ?? "N/A",
            createAt: newUser.createdAt
        };
        return respose;
    }
}