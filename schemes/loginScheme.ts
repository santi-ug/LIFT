import { z } from "zod";

export const loginScheme = z.object({
	email: z
		.string()
		.email({message: "Please enter a valid email"})
        .max(20)
		.min(1, {message: "Email is required"}),
	password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(20),
});