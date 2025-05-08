<template>
  <TheHeader></TheHeader>
  <v-container
    fluid
    class="fill-height pa-0"
    style="
      background-image: url('/img/white-bottle.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #f8f8f6;
    "
  >
    <v-row no-gutters class="fill-height" align="center">
      <v-col
        cols="12"
        md="6"
        class="pa-12 white--text d-flex flex-column justify-center"
        style="
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(139, 195, 74, 1) 0%,
            rgba(200, 230, 201, 0.4) 70%,
            transparent 100%
          );
        "
      >
        <h1 class="display-2 font-weight-bold">Recycle Bottles Easily</h1>
        <p class="mt-5">
          Join our initiative to make the planet cleaner. Schedule a pickup and
          we’ll handle the rest.
        </p>
      </v-col>

      <v-row align="center" justify="center" mt="10">
        <v-col cols="12" md="10" lg="7">
          <v-card class="pa-5" elevation="5">
            <v-card-title class="text-h6 text-center">
              Schedule Bottle Pickup
            </v-card-title>
            <v-form ref="form" @submit.prevent="submitOrder">
              <v-text-field
                v-model="fullName"
                label="Full Name"
                prepend-icon="mdi-account"
                :rules="[rules.required('Full name')]"
                required
              />

              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                type="tel"
                prepend-icon="mdi-phone"
                :rules="[rules.required('Phone number'), rules.phone()]"
                required
              />

              <v-text-field
                v-model="address"
                label="Pickup Address"
                prepend-icon="mdi-map-marker"
                :rules="[rules.required('Address')]"
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
                :rules="[
                  rules.required('Bottle count'),
                  rules.numberRange('Bottle count', 10, 1000),
                ]"
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
                color="rgba(139, 195, 74, 1)"
                block
                class="mt-4"
                :loading="loading"
              >
                Submit Order
              </v-btn>
            </v-form>

            <v-alert
              v-if="successMessage"
              type="success"
              class="mt-4"
              border="start"
              closable
              @click:close="successMessage = ''"
            >
              {{ successMessage }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import { ref } from "vue";
import axios from "axios";
import { validationRules as rules } from "@/utils/ValidationRules";

const fullName = ref("");
const phoneNumber = ref("");
const address = ref("");
const bottleCount = ref<number | null>(null);
const notes = ref("");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const form = ref();

async function submitOrder() {
  const result = await form.value?.validate();
  if (!result?.valid) return;

  loading.value = true;
  successMessage.value = "";
  try {
    await axios.post("http://localhost:8083/api/requests", {
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

    fullName.value = "";
    phoneNumber.value = "";
    address.value = "";
    bottleCount.value = null;
    notes.value = "";
    form.value.reset();
    successMessage.value = "Your pickup request was sent!";
  } catch (err) {
    console.error("Failed to submit order:", err);
    alert("Something went wrong. Please try again later.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
