import { z } from "zod";

export const biometricHistoryScheme = z.object({
	weight: z.number({required_error: "Weight is required",
                invalid_type_error: "Weight must be a number",})
            .positive()
            .gte(20)
            .lte(635),
		
	height: z.number({required_error: "Height is required",
                invalid_type_error: "Height must be a number",})
            .positive()
            .gte(122)
            .lte(251),

	bmi: z.number({required_error: "Body mass index is required",
                invalid_type_error: "Body mass index be a number",})
            .positive()
            .gte(0)
            .lte(100),			

	fat_percentage: z.number({required_error: "Fat percentage is required",
                        invalid_type_error: "Fat percentage must be a number",})
                    .positive()
                    .gte(0)
                    .lte(100),
});