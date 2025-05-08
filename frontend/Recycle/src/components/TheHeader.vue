<template>
  <v-app-bar app flat color="transparent" class="px-15">
    <v-toolbar-title>Recycle App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon start>mdi-menu</v-icon>
          Menu
          <v-icon end>mdi-chevron-down"></v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="{ path: '/' }" router>
          <v-list-item-title>
            <v-icon start>mdi-truck</v-icon>Order
          </v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/profile' }" router>
          <v-list-item-title>
            <v-icon start>mdi-account-circle</v-icon>Profile
          </v-list-item-title>
        </v-list-item>

        <!-- Admin-only menu item -->
        <v-list-item
          v-if="user.role === 'admin'"
          :to="{ path: '/admin/panel' }"
          router
        >
          <v-list-item-title>
            <v-icon start>mdi-account-cog</v-icon>Admin Panel
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn text> <v-icon start>mdi-logout</v-icon>Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>
