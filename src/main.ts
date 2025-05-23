import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import { useApp } from "./hooks/useApp";

const app = createApp(App);
useApp(app);

app.mount("#app");
