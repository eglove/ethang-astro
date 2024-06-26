import { defineConfig } from "astro/config";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [serviceWorker()],
});
