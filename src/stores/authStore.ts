import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const authChecked = ref(false);
  const redirectPath = ref<string | null>(null);
  const isAuthenticated = computed(() => {
    return !!user.value;
  });

  async function initializeAuth() {
    if (authChecked.value) return;

    try {
      loading.value = true;
      const refreshResponse = await refreshTokens();
      if (refreshResponse?.message === "Token refreshed") {
        await loadProfile();
      }
    } catch (e) {
      console.error("Init auth error:", e);
      user.value = null;
      error.value = null;
    } finally {
      loading.value = false;
      authChecked.value = true;
    }
  }

  async function loadProfile() {
    try {
      const response = await AuthService.getProfile();
      if (response?.data) {
        user.value = response.data;
        console.log("User profile loaded:", user.value);
      }
    } catch (e) {
      console.error("Load profile error:", e);
      user.value = null;
      error.value = e instanceof Error ? e.message : "Failed to load profile";
      throw e;
    }
  }

  async function login(credentials: LoginCredentials) {
    try {
      loading.value = true;
      error.value = null;
      await AuthService.login(credentials);
      await loadProfile();
      router.push(redirectPath.value || "/");
      redirectPath.value = null;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      error.value = message;
      throw new Error(message);
    } finally {
      loading.value = false;
    }
  }

  function setRedirectPath(path: string) {
    redirectPath.value = path;
  }

  async function register(credentials: RegisterCredentials) {
    try {
      loading.value = true;
      error.value = null;
      await AuthService.register(credentials);
      await loadProfile();
      router.push("/");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      error.value = message;
      throw new Error(message);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await AuthService.logout();
    } catch (e) {
      error.value = "Logout failed";
    } finally {
      user.value = null;
      authChecked.value = true;
      router.push("/auth/login");
    }
  }

  async function refreshTokens() {
    try {
      const response = await AuthService.refresh();
      return response;
    } catch (e) {
      console.error("Refresh tokens error:", e);
      user.value = null;
      throw e;
    }
  }

  return {
    user,
    loading,
    error,
    authChecked,
    isAuthenticated,
    register,
    login,
    logout,
    refreshTokens,
    loadProfile,
    initializeAuth,
    setRedirectPath,
    redirectPath: computed(() => redirectPath.value),
  };
});
