import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(createPersistedState());

const app = createApp(App);

registerPlugins(app);

app.use(pinia).mount("#app");
