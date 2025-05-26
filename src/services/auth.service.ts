import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AchievementsResponse,
} from "@/types/auth";
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

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/api/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error, "Ошибка авторизации");
    }
  }

  static async register(credentials: RegisterCredentials): Promise<void> {
    try {
      console.log(credentials);
      await apiClient.post("/api/auth/registration", credentials);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Ошибка регистрации");
    }
  }

  static async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
  }

  static async checkAuth(): Promise<AuthResponse> {
    try {
      const response = await apiClient.get<AuthResponse>("/api/auth");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Ошибка проверки авторизации"
      );
    }
  }

  static async getAchievements(): Promise<AchievementsResponse> {
    try {
      const response = await apiClient.get<AchievementsResponse>(
        "/api/achievement"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Ошибка получения достижений"
      );
    }
  }
}
