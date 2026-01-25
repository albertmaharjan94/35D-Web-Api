import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../types/user.type";
const userMongoSchema: Schema = new Schema(
    {
        firstName: { type: String, required: false },
        lastName: { type: String }, // default is optional
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        imageUrl: { type: String, required: false } // add this
    },
    {
        timestamps: true, // auto field - createdAt, updatedAt
    }
)
export interface IUser extends UserType, Document { // combined type
    _id: mongoose.Types.ObjectId; // extra mongo attribute 
    createdAt: Date; 
    updatedAt: Date; 
}
export const UserModel = mongoose.model<IUser>("User", userMongoSchema);
// UserModel -> db.users