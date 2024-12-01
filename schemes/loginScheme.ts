import { z } from "zod";
const specialCharacters = [' ', 'ñ', 'Ñ', '(', ')', '%', '&', '$', '#', '?', '¡', '¿', '=', '>', 
	'<', '°', '|', '!', '¬', '^', ']', '[', '{', '}', '+', '~', '*', '/'];

export const loginScheme = z.object({
	email: z
		.string()
		.email({message: "Please enter a valid email"})
        .max(40)
		.min(1, {message: "Email is required"}),
		
	password: z.string()
				.min(8, {message: "Password must be at least 8 characters long"})
				.max(20)
				.refine((password) => {
					const hasSpace = password.includes(' ');
					const hasSpecialChar = specialCharacters.filter(char => password.includes(char)).length;

					return !hasSpace && !password.includes('ñ') && !password.includes('Ñ') && hasSpecialChar <= 1;
				}, { message: "Password cannot contain spaces, the letter 'ñ', and must contain at most one special character" }),	
});