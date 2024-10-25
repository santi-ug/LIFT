import { z } from "zod";

export const registerScheme = z.object({
	name: z.string()
            .min(4, {message: "Username must be at least 4 characters long"})
            .max(20),
	email: z
		.string()
		.email({message: "Please enter a valid email"})
        .max(20)
		.min(1, {message: "Email is required"}),
	password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(20),
	confirmPassword: z.string().min(8, {message: "Confirm password is required"}).max(20),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});