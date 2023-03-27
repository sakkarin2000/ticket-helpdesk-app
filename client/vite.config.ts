/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.spec.tsx"],
    environment: "jsdom",
  },

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
