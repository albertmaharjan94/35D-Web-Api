import z from "zod";
import { UserSchema } from "../types/user.type";
export const CreateUserDto = UserSchema.pick( // re use UserSchema
    {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        password: true
    }
).extend( // add additional attributes
    {
        confirmPassword: z.string().min(6)
    }
).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"] // set the path of the error to "confirmPassword"
    }
)
export type CreateUserDto = z.infer<typeof CreateUserDto>;

// export const UpdateUserDto = UserSchema.partial(); // all optional fields
export const UpdateUserDto = UserSchema.pick(
    {
        firstName: true,
        lastName: true,
        username: true,
        email: true
    }
)
export type UpdateUserDto = z.infer<typeof UpdateUserDto>;