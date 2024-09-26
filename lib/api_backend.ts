import { UserData, ApiResponse } from '../types/Api'

const API = `http://192.168.1.143:5000/api/v1`;

export const registerUser = async (userData: UserData): Promise<ApiResponse> => {
    console.log(JSON.stringify(userData));
    try {
        const response = await fetch(`${API}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(userData),
        });
        
        const data: ApiResponse = await response.json();
        if (response.ok) {
            console.log('Registration successful:', data);
            return data;
        } else {
            console.error('Error in registration:', data);
            return data;
        }
    } catch (error: any) {
        console.error('Network error:', error);
        throw new Error(error.message);
    }
};

export const loginUser = async (userData: UserData): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
  
        const data: ApiResponse = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            return data;
        } else {
            console.error('Error in login:', data);
            return data;
        }
    } catch (error: any) {
        console.error('Network error:', error.message);
        throw new Error(error.message);
    }
};