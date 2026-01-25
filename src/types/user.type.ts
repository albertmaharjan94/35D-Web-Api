import z from "zod";

export const UserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(3),
    role: z.enum(["user", "admin"]).default("user"),
    imageUrl: z.string().optional() // add this
})

export type UserType = z.infer<typeof UserSchema>;