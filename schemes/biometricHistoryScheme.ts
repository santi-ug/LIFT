import { z } from "zod";

export const biometricHistoryScheme = z.object({
	weight: z.number({required_error: "Weight is required",
                invalid_type_error: "Weight must be a number",})
            .positive()
            .gte(20, {message: "Weight must be greater than or equal to 20"})
            .lte(635, {message: "Weight must be less than or equal to 635"}),
		
	height: z.number({required_error: "Height is required",
                invalid_type_error: "Height must be a number",})
            .positive()
            .gte(122, {message: "Height must be greater than or equal to 122"})
            .lte(251, {message: "Height must be less than or equal to 251"}),

	bmi: z.number({required_error: "Body mass index is required",
                invalid_type_error: "Body mass index be a number",})
            .positive()
            .gte(0, {message: "Body mass index must be greater than or equal to 0"})
            .lte(100, {message: "Body mass index must be less than or equal to 100"}),			

	fat_percentage: z.number({required_error: "Fat percentage is required",
                        invalid_type_error: "Fat percentage must be a number",})
                    .positive()
                    .gte(0, {message: "Fat percentage must be greater than or equal to 0"})
                    .lte(100, {message: "Fat percentage must be less than or equal to 100"}),
});