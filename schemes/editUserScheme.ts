import { z } from "zod";

const specialCharacters = [' ', 'ñ', 'Ñ', '(', ')', '?', '¡', '¿', '=', '>', 
							'<', '°', '|', '¬', '^', ']', '[', '{', '}', '+', '~', '*', '/'];

const allowedSpecialCharacters = ['@', '.', '-', '_', '!', '#', '$', '%', '&'];

export const editUserScheme = z.object({
	name: z.string()
            .min(4, {message: "Username must be at least 4 characters long"})
            .max(20)
			.refine((name) => {
				return !specialCharacters.some(char => name.includes(char));
			}, { message: "Username cannot contain special characters or spaces" })
            .optional(),
		
	email: z.string()
			.email({message: "Please enter a valid email"})
			.max(40)
            .optional(),

	password: z.string()
				.min(8, {message: "Password must be at least 8 characters long"})
				.max(20)
				.refine((password) => {
					const hasNumber = /\d/.test(password); 
					const hasLetter = /[a-zA-Z]/.test(password); 
					const hasSpecialChar = allowedSpecialCharacters.some(char => password.includes(char)); 
					const hasInvalidChar = specialCharacters.some(char => password.includes(char)); 

					return hasNumber && hasLetter && hasSpecialChar && !hasInvalidChar;
				}, { message: "Password must contain at least one letter, one number, and one special character from the allowed list (@, ., -, _, !, #, $, %, &)" })
				.optional(),				

	confirmPassword: z.string()
                        .min(8, {message: "Confirm password is required"})
                        .max(20)
                        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});