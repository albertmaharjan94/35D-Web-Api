import { z } from 'zod';
import { UserSchema } from '../types/user.type';

// What clients sends when creating a new user
export const CreateUserDto = UserSchema.extend({
    password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
// What Server responds with when sending user data
export const UserResponseDto = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    createAt: z.date()
})
export type UserResponseDto = z.infer<typeof UserResponseDto>;