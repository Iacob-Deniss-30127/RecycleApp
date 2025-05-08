import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    email: "",
    role: "",
    token: "",
    isAuthenticated: false,
  }),
  actions: {
    setToken(token: string) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        this.email = decoded.sub;
        this.role = decoded.roles.includes("ROLE_ADMIN") ? "admin" : "user";
        this.token = token;
        this.isAuthenticated = true;
      } catch (err) {
        console.error("Invalid token:", err);
        this.logout();
      }
    },
    logout() {
      this.$reset();
    },
  },
  persist: true,
});
