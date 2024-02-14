import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, "**/playwright/**"],
    alias: {
      "~/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
    setupFiles: ["dotenv/config", "./src/test-setup"],
  },
});
