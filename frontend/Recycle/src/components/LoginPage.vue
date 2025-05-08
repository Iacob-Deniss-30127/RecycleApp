<template>
  <v-container class="login-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-5" elevation="8">
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-form @submit.prevent="handleLogin" ref="form">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              prepend-icon="mdi-email"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              prepend-icon="mdi-lock"
            />
            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              class="mt-4"
              >Login</v-btn
            >
            <v-alert v-if="error" type="error" class="mt-3">
              {{ error }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

const router = useRouter();
const userStore = useUserStore();

async function handleLogin() {
  error.value = null;
  loading.value = true;

  try {
    const response = await axios.post("http://localhost:8083/api/user/login", {
      email: email.value,
      password: password.value,
    });

    const token = response.data;
    console.log("RAW JWT:", response.data.token);
    userStore.setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    router.push("/");
  } catch (err) {
    console.error("Login failed:", err);
    error.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
