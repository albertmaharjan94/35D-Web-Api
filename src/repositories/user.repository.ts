import { UserModel, IUser } from "../models/user.model";
export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    // 5 common database methods
    createUser(userData: Partial<IUser>): Promise<IUser>;
    getUserById(userId: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>; // pagination later
    updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<boolean | null>;
}
export class UserRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        await user.save(); // same as db.users.insertOne()
        return user;
    }
    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ "email" : email });
        return user;
    }
    async getUserByUsername(username: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ "username" : username });
        return user;
    }
    
    async getUserById(userId: string): Promise<IUser | null> {
        // UserModel.findOne({ "_id": userId });
        const user = await UserModel.findById(userId);
        return user;
    }
    async getAllUsers(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }
    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        // UserModel.updateOne({ "_id": userId }, { $set: updateData });
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } // return updated document
        );
        return updatedUser;
    }
    async deleteUser(userId: string): Promise<boolean | null> {
        // UserModel.deleteOne({ "_id": userId });
        const result = await UserModel.findByIdAndDelete(userId);
        return result ? true : false;
    }
}