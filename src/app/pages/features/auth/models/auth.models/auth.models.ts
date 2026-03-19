export interface RegisterRequest { name: string; email: string; password: string; }
export interface LoginCredentials { email: string; password: string; }
export interface User { id: string; name: string; email: string; createdAt: Date; }
export interface LoginResponse { token: string; user: User; }
export interface RegisterResponse { success: boolean; message: string; }