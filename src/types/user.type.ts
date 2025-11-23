import { z }  from 'zod';
// Source of truth for  User
export const UserSchema = z.object({
    name: z.string(),
    email: z.email().optional(),
    age: z.number().min(0).optional(),
});
export type User = z.infer<typeof UserSchema>;

// Database related type
export type UserDocument = User & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};