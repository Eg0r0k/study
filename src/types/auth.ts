export type Roles = "admin" | "user";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  role: Roles;
  level: number;
  achievements: Achievement[];
  certificatesCount: number;
  unlockedAchievementsCount: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  repeatPassword: string;
}
