export interface UserData {
    name?: string;
    email?: string;
    password?: string;
    avatar?: Blob | null; 
}

export interface ApiResponse {
    success: boolean;
    message: string;
    user?: UserData; 
    token?: string;
    errors?: { location: string; msg: string; path: string; type: string; value: string }[];
}

export interface BiometricHistoryData {
    id?: number;
    weight: number;
    height: number;
    bmi: number;
    fat_percentage: number;
    date: string;
    user_id?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponseBiometricHistory {
    success: boolean;
    message?: string;
    data?: BiometricHistoryData[];
    errors?: { location: string; msg: string; path: string; type: string; value: string }[];
}
  