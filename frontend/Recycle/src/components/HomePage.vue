<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <v-container class="mt-10">
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-card class="pa-5" elevation="5">
              <v-card-title class="text-h6 text-center">
                Schedule Bottle Pickup
              </v-card-title>
              <v-form @submit.prevent="submitOrder">
                <v-text-field
                  v-model="fullName"
                  label="Full Name"
                  prepend-icon="mdi-account"
                  required
                />
                <v-text-field
                  v-model="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  prepend-icon="mdi-phone"
                  required
                />

                <v-text-field
                  v-model="address"
                  label="Pickup Address"
                  prepend-icon="mdi-map-marker"
                  required
                />

                <v-text-field
                  v-model="bottleCount"
                  label="Number of Bottles"
                  type="number"
                  :min="10"
                  :max="1000"
                  step="1"
                  prepend-icon="mdi-bottle-soda"
                  required
                />

                <v-textarea
                  v-model="notes"
                  label="Notes"
                  prepend-icon="mdi-note-text"
                  rows="3"
                />
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  class="mt-4"
                  :loading="loading"
                  @click="submitOrder"
                >
                  Submit Order
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import { ref } from "vue";
import axios from "axios";

const fullName = ref("");
const phoneNumber = ref("");
const address = ref("");
const bottleCount = ref<number | null>(null);
const notes = ref("");
const loading = ref(false);

async function submitOrder() {
  loading.value = true;

  try {
    await axios.post("/api/orders", {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      bottleCount: bottleCount.value,
      notes: notes.value || null,
    });
    console.log({
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      bottleCount: bottleCount.value,
      notes: notes.value,
    });

    alert("Your bottle pickup has been submitted!");
    fullName.value = "";
    phoneNumber.value = "";
    address.value = "";
    bottleCount.value = null;
    notes.value = "";
  } catch (err) {
    console.error("Failed to submit order:", err);
    alert("Something went wrong. Please try again later.");
  } finally {
    loading.value = false;
  }
}
</script>
