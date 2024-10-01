export interface UserData {
    name?: string;
    email: string;
    password: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    errors?: { location: string; msg: string; path: string; type: string; value: string }[];
}
  