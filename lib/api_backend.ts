import mime from 'mime';
import * as SecureStore from 'expo-secure-store';
import { router, Stack } from "expo-router";
import { Alert } from "react-native";
import { ApiResponse, ApiResponseBiometricHistory, BiometricHistoryData, UserData } from "../types/Api";
import { Workout } from "../types/workout";

// 172.20.10.6 - hotspot
const url = "virtual-pro-y.win";
console.log("Hola23", `https://${url}/api/v1/users/me`);

export const registerUser = async (
	userData: UserData
): Promise<ApiResponse> => {
	console.log("yo", JSON.stringify(userData));
	try {
		const response = await fetch(`https://${url}/api/v1/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors
				.map((error: any) => error.msg)
				.join("\n");
			console.error("Errors in registration:", errorMessages);
			return { success: false, message: errorMessages };
		} else {
			const token = data.token || "";
			await SecureStore.setItemAsync("authToken", token);
			console.log("Registration successful and token saved:", data);
			return data;
		}
	} catch (error: any) {
		console.error("Network error:", error);
		throw new Error(error.message);
	}
};

export const loginUser = async (userData: UserData): Promise<ApiResponse> => {
	try {
		const response = await fetch(`https://${url}/api/v1/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors
				.map((error: any) => error.msg)
				.join("\n");
			console.error("Errors in login:", errorMessages);
			return { success: false, message: errorMessages };
		} else {
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
		console.log("token", token);

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
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

export const updateImage = async (
	imageUri: string | undefined
): Promise<UserData | undefined> => {
	try {
		const token = await SecureStore.getItemAsync("authToken");

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		if (imageUri && typeof imageUri === "string") {
			const fileType = mime.getType(imageUri) || "application/octet-stream";
			const fileName = imageUri.split("/").pop();

			const formData = new FormData();

			const res = await fetch(imageUri);

			formData.append("avatar", {
				uri: imageUri,
				name: fileName || "avatar.jpg",
				type: fileType,
			} as any);

			console.log("FormData created:", formData);

			const response = await fetch(`https://${url}/api/v1/users/myImage`, {
				method: "PUT",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Response Status:", response.status);
			console.log("Response Headers:", response.headers);

			if (!response.ok) {
				console.error("Error in response", await response.text());
				throw new Error("Failed to upload image");
			}

			const data = await response.json();
			console.log("Image upload successful:", data);
			return data.user;
		} else {
			console.error("Invalid image URI provided:", imageUri);
			throw new Error("Invalid image URI provided");
		}
	} catch (error: any) {
		console.error("Network error:", error.message || error);
		console.error("Error stack:", error.stack);
		console.error("Error name:", error.name);
		console.error("Error code:", error.code);
		throw new Error(error.message || "Network error occurred");
	}
};

export const removeImage = async (): Promise<UserData | undefined> => {
	try {
		const token = await SecureStore.getItemAsync("authToken");

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		const response = await fetch(`https://${url}/api/v1/users/myImage`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log("Response Status:", response.status);
		console.log("Response Headers:", response.headers);

		if (!response.ok) {
			console.error("Error in response", await response.text());
			throw new Error("Failed to remove image");
		}

		const data = await response.json();
		console.log("Image removal successful:", data);
		return data.user;
	} catch (error: any) {
		console.error("Network error:", error.message || error);
		console.error("Error stack:", error.stack);
		console.error("Error name:", error.name);
		console.error("Error code:", error.code);
		throw new Error(error.message || "Network error occurred");
	}
};

export const logout = async () => {
	try {
		const token = await SecureStore.getItemAsync("authToken");

		const response = await fetch(`https://${url}/api/v1/users/logout`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		await SecureStore.deleteItemAsync("authToken");

		if (response.ok) {
			const data = await response.json();
			console.log("api", data);
		} else {
			const errorData = await response.text();
			console.error("Error al cerrar sesión", errorData);
		}
	} catch (error) {
		console.error(error);
	}
};

export const update = async (userData: UserData): Promise<ApiResponse> => {
	console.log(JSON.stringify(userData));
	try {
		const token = await SecureStore.getItemAsync("authToken");

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},

			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors
				.map((error: any) => error.msg)
				.join("\n");
			console.error("Errors in update:", errorMessages);
			return { success: false, message: errorMessages };
		} else {
			console.log("Update successful and token saved:", data);
			return data;
		}
	} catch (error: any) {
		console.error("Network error:", error);
		throw new Error(error.message);
	}
};

export const deleteUser = async () => {
	try {
		const token = await SecureStore.getItemAsync("authToken");

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		await SecureStore.deleteItemAsync("authToken");

		if (response.ok) {
			const data = await response.json();
			console.log("api", data);
		} else {
			const errorData = await response.text();
			console.error("Error al eliminar usuario", errorData);
		}
	} catch (error) {
		console.error(error);
	}
};

const transformWorkoutData = (data: Workout) => {
	// Validate inputs for mandatory fields
	if (!data.title || typeof data.title !== "string") {
		throw new Error("Invalid title");
	}
	if (!data.notes || typeof data.notes !== "string") {
		throw new Error("Invalid notes");
	}
	if (!data.date || isNaN(Date.parse(data.date))) {
		throw new Error("Invalid date");
	}
	if (!data.start_time || isNaN(Date.parse(data.start_time))) {
		throw new Error("Invalid start time");
	}
	if (!data.end_time || isNaN(Date.parse(data.end_time))) {
		throw new Error("Invalid end time");
	}
	if (typeof data.duration !== "number") {
		throw new Error("Invalid duration");
	}
	if (typeof data.total_sets !== "number") {
		throw new Error("Invalid total sets");
	}

	// Transform data
	return {
		title: data.title,
		notes: data.notes,
		date: data.date,
		start_time: data.start_time,
		end_time: data.end_time,
		duration: data.duration,
		total_sets: data.total_sets,
	};
};

export const finishWorkout = async (workoutData: Workout) => {
	// Usage example

	try {
		const transformedWorkoutData = transformWorkoutData(workoutData); // Replace '1' with the authenticated user's ID
		console.log("Transformed Data:", transformedWorkoutData);
		const token = await SecureStore.getItemAsync("authToken");

		// Example API endpoint and payload
		const response = await fetch(`https://${url}/api/v1/workouts`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transformedWorkoutData), // Send workout data to the backend
		});

		if (response.ok) {
			Alert.alert("Workout Finished", "Your workout was saved successfully.");
			router.push("/newworkout"); // Redirect to the new workout page
		} else {
			Alert.alert(
				"Error",
				"There was an issue saving your workout. Please try again."
			);
		}

		return response;
	} catch (error) {
		console.error("Error saving workout:", error);
		Alert.alert(
			"Error",
			"Unable to finish the workout. Please try again later."
		);
	}
};

export const registerBiometricHistory = async (
	biometricHistoryData: BiometricHistoryData
): Promise<ApiResponse> => {
	console.log("yo-biometric", JSON.stringify(biometricHistoryData));
	try {
        const token = await SecureStore.getItemAsync("authToken");
        console.log("token", token);

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

		const response = await fetch(`https://${url}/api/v1/biometrichistories`, {
			method: "POST",
			headers: {
                "Authorization": `Bearer ${token}`,
				"Content-Type": "application/json",
			},

			body: JSON.stringify(biometricHistoryData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: any) => error.msg).join("\n");
			console.error("Errors in creating a biometric history:", errorMessages);
			return { success: false, message: errorMessages };
		}else{
            console.log("Successful creation:", data);
            return data;
		}
	} catch (error: any) {
		console.error("Network error:", error);
		throw new Error(error.message);
	}
};

export const getAllBiometricHistory = async (): Promise<BiometricHistoryData[]> => {
    try {
        const token = await SecureStore.getItemAsync("authToken");
        console.log("token", token);

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

        const response = await fetch(`https://${url}/api/v1/biometrichistories`, {
            method: "GET",
            headers: {
				"Authorization": `Bearer ${token}`,
            },
        });

        //console.log("data", response.json());
        const data: ApiResponseBiometricHistory = await response.json();

        if (!response.ok || !data.success || !data.data) {
            throw new Error(data.message || "Failed to fetch biometric histories");
        }

        return data.data;
    } catch (error: any) {
        console.error("Network error:", error.message);
        throw new Error(error.message);
    }
};
