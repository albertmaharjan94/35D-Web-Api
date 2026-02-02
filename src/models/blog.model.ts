import mongoose, { Document, Schema } from "mongoose";
import { BlogType } from "../types/blog.type";

export interface IBlog extends Omit<BlogType, "authorId">, Document { // combined type
    authorId: mongoose.Types.ObjectId | string; // reference to User
    _id: mongoose.Types.ObjectId; // extra mongo attribute 
    createdAt: Date; 
    updatedAt: Date; 
}
const schema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference to User model
    },
    {
        timestamps: true, // auto field - createdAt, updatedAt
    }
);
export const BlogModel = mongoose.model<IBlog>("Blog", schema);
// BlogModel -> db.blogs