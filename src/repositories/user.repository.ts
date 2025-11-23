import { UserRepositoryInterface } from "../interfaces/user.repository.interface";
import { User, UserDocument } from "../types/user.type";

export class UserRepository implements UserRepositoryInterface {
    private users: UserDocument[] = [];
    async createUser(user: User): Promise<UserDocument> {
        // DB query simulation
        const newUser: UserDocument = {
            ...user,
            _id: "generated_id",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }
    
    async getUsers(): Promise<UserDocument[]> {
        return this.users;
    }
}