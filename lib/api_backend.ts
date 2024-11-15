import mime from 'mime';
import * as SecureStore from 'expo-secure-store';
import { ApiResponse, UserData } from "../types/Api";

console.log("Hola23", `http://192.168.1.143:5000/api/v1//users/me`)

export const registerUser = async (
	userData: UserData
): Promise<ApiResponse> => {
	console.log("yo", JSON.stringify(userData));
	try {
		const response = await fetch(`http://192.168.1.143:5000/api/v1//users/register`, {
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
		const response = await fetch(`http://192.168.1.143:5000/api/v1//users/login`, {
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
        console.log("token", token);

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

        const response = await fetch(`http://192.168.1.143:5000/api/v1//users/me`, {
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

export const updateImage = async (imageUri: string | undefined): Promise<UserData | undefined> => {
    try {
        const token = await SecureStore.getItemAsync("authToken");

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

        if (imageUri && typeof imageUri === 'string') {
            const fileType = mime.getType(imageUri) || 'application/octet-stream'; 
            const fileName = imageUri.split('/').pop();  

            const formData = new FormData();

            const res = await fetch(imageUri);

            formData.append('avatar', {
                uri: imageUri,
                name: fileName || 'avatar.jpg', 
                type: fileType,
            } as any);

            console.log("FormData created:", formData);

            const response = await fetch(`http://192.168.1.143:5000/api/v1//users/myImage`, {
                method: 'PUT',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
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

        const response = await fetch(`http://192.168.1.143:5000/api/v1//users/myImage`, {
            method: 'DELETE', 
            headers: {
                "Authorization": `Bearer ${token}`,
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

        const response = await fetch(`http://192.168.1.143:5000/api/v1//users/logout`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
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

export const update = async (
	userData: UserData
): Promise<ApiResponse> => {
    console.log(JSON.stringify(userData));
	try {
        const token = await SecureStore.getItemAsync("authToken");

        if (!token) {
            console.error("No token found, user is not authenticated");
            throw new Error("No token found, user is not authenticated");
        }

		const response = await fetch(`http://192.168.1.143:5000/api/v1//users/me`, {
			method: 'PUT',
			headers: {
                "Authorization": `Bearer ${token}`,
				"Content-Type": "application/json",
			},

			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: any) => error.msg).join("\n");
			console.error("Errors in update:", errorMessages);
			return { success: false, message: errorMessages };
		}else{
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

        const response = await fetch(`http://192.168.1.143:5000/api/v1//users/me`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
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