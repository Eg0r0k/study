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

  const isAuthenticated = computed(() => !!user.value);

  const setUserData = async () => {
    const [authData, achievementsData] = await Promise.all([
      AuthService.checkAuth(),
      AuthService.getAchievements(),
    ]);

    user.value = {
      user_id: achievementsData.user.user_id,
      level: achievementsData.user.level,
      experience: achievementsData.user.experience,
      username: authData.username,
      role: authData.role,
      permissions: authData.permissions,
      unlocked_achievements: achievementsData.unlocked_achievements,
      locked_achievements: achievementsData.locked_achievements,
    };
  };

  async function initializeAuth() {
    if (authChecked.value) return;

    try {
      loading.value = true;
      await setUserData();
    } catch (e) {
      console.error("Init auth error:", e);
      user.value = null;
      error.value = null;
    } finally {
      loading.value = false;
      authChecked.value = true;
    }
  }

  async function login(credentials: LoginCredentials) {
    try {
      loading.value = true;
      error.value = null;
      await AuthService.login(credentials);
      await setUserData();

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
      await AuthService.login({
        username: credentials.username,
        password: credentials.password,
      });
      await setUserData();
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

  const userInitials = computed(() => {
    if (!user.value?.username) {
      return "U";
    }
    const username = user.value.username.trim();
    if (!username) {
      return "U";
    }
    const names = username.split(/\s+/);
    let initials = "";
    if (names.length >= 2) {
      initials = names[0][0] + names[names.length - 1][0];
    } else {
      initials = names[0].slice(0, 2);
    }
    return initials.toUpperCase().padEnd(2, "").slice(0, 2);
  });

  return {
    user,
    loading,
    error,
    authChecked,
    isAuthenticated,
    register,
    login,
    logout,
    initializeAuth,
    setRedirectPath,
    redirectPath: computed(() => redirectPath.value),
    userInitials,
  };
});
