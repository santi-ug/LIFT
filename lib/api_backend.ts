import * as SecureStore from 'expo-secure-store';
import { ApiResponse, UserData } from "../types/Api";

console.log("hola", process.env.API_URL);
export const registerUser = async (
	userData: UserData
): Promise<ApiResponse> => {
	console.log(JSON.stringify(userData));
	try {
		const response = await fetch(`${process.env.API_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: any) => error.msg).join("\n");
			console.error("Errors in registration:", errorMessages);
			return { success: false, message: errorMessages };
		}else{
			console.log("Registration successful:", data);
			return data;
		}
	
	} catch (error: any) {
		console.error("Network error:", error);
		throw new Error(error.message);
	}
};

export const loginUser = async (userData: UserData): Promise<ApiResponse> => {
	try {
		const response = await fetch(`${process.env.API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: any) => error.msg).join("\n");
			console.error("Errors in login:", errorMessages);
			return { success: false, message: errorMessages };
		}else{
			const token = data.token || ""; 
            await SecureStore.setItemAsync("authToken", token);
            console.log("Login successful and token saved:", data);
            return data;
		}
	} catch (error: any) {
		console.error("Network error:", error.message);
		throw new Error(error.message);
	}
};

export const infoUser = async (): Promise<UserData | undefined> => {
    try {
        const token = await SecureStore.getItemAsync("authToken");

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

        const response = await fetch(`${process.env.API_URL}/users/me`, {
            method: "GET",
            headers: {
				"Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data: ApiResponse = await response.json();

        if (response.ok) {
            console.log("User info retrieved successfully", data);
            if (!data.user) {
				throw new Error("User data not found in response");
			}

			return data.user;
        }
    } catch (error: any) {
        console.error("Network error:", error.message);
        throw new Error(error.message);
    }
};
