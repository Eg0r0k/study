import { useAuthStore } from "@/stores/authStore";
import type { Roles } from "@/types/auth";
import { computed, type ComputedRef } from "vue";

type PermissionKey = "read" | "write" | "delete" | "update";

type PermissionsMap = Record<Roles, PermissionKey[]>;

const permissionsMap: PermissionsMap = {
  admin: ["read", "write", "delete", "update"],
  user: ["read", "write"],
};

export const usePermissions = () => {
  const { user } = useAuthStore();

  const userPermissions: ComputedRef<PermissionKey[]> = computed(() => {
    if (!user) {
      return [];
    }
    return permissionsMap[user.role];
  });
  const can = (action: PermissionKey): boolean => {
    return userPermissions.value.includes(action);
  };
  const canAll = (actions: PermissionKey[]): boolean => {
    return actions.every((a) => can(a));
  };
  const hasRole = (role: Roles): boolean => {
    return user?.role === role;
  };
  const hasAnyRole = (roles: Roles[]): boolean => {
    if (!user) {
      return false;
    }
    return roles.includes(user.role);
  };

  return {
    hasRole,
    hasAnyRole,
    can,
    canAll,
    userPermissions,
  };
};
