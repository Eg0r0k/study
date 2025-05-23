import type { LoginCredentials, RegisterCredentials, User } from "@/types/auth";
import apiClient from "@/lib/axios";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export class AuthService {
  private static handleError(error: any, defaultMessage: string): never {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      defaultMessage;
    throw new Error(message);
  }

  static async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>(
        "/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error, "Ошибка авторизации");
    }
  }

  static async register(
    credentials: RegisterCredentials
  ): Promise<ApiResponse<void>> {
    try {
      const { repeatPassword, ...registrationData } = credentials;
      const response = await apiClient.post<ApiResponse<void>>(
        "/register",
        registrationData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Ошибка регистрации");
    }
  }

  static async logout(): Promise<void> {
    await apiClient.post("/logout");
  }

  static async refresh(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>("/refresh");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Ошибка обновления токена"
      );
    }
  }
  static async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.get<User>("/profile");
      return {
        data: response.data,
        message: "Success",
        status: response.status,
      };
    } catch (error: any) {
      console.log("Profile API Response:", error.response);
      throw new Error(
        error.response?.data?.message || "Ошибка получения профиля"
      );
    }
  }
}
