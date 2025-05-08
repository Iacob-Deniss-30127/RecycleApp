import HomePage from "@/components/HomePage.vue";
import LoginPage from "../components/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import Page from "@/components/Page.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import { useUserStore } from "@/stores/user";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/",
      name: "home",
      component: Page,
    },
    {
      path: "/admin/panel",
      component: AdminPanel,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.isAuthenticated) {
    return next("/login");
  }
  if (to.meta.requiresAdmin && user.role !== "admin") {
    return next("/");
  }
  next();
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
