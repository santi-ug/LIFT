import { z } from "zod";

const specialCharacters = [' ', 'ñ', 'Ñ', '(', ')', '%', '&', '$', '#', '?', '¡', '¿', '=', '>', 
							'<', '°', '|', '!', '¬', '^', ']', '[', '{', '}', '+', '~', '*', '/'];

const specialCharactersPassword = [' ', 'ñ', 'Ñ', '(', ')', '>', '<', '°', '|', '!', '¬', '^', ']', '[', '{', '}',];		

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
			.max(20)
            .optional(),

	password: z.string()
				.min(8, {message: "Password must be at least 8 characters long"})
			    .max(20)
				.refine((password) => {
					const hasSpecialChar = specialCharacters.filter(char => password.includes(char)).length;
		
					return hasSpecialChar <= 1 && !specialCharactersPassword.some(char => password.includes(char));
				}, { message: "Password cannot contain spaces, the letter 'ñ', and must contain at most one special character" })
                .optional(),				

	confirmPassword: z.string()
                        .min(8, {message: "Confirm password is required"})
                        .max(20)
                        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});