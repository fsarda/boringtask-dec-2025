import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts?(x)"],
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts?(x)"],
    },
  },
});
