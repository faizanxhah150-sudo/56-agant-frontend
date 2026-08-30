import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code-split per-route so loading one tool doesn't pull in the other 55.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("src/tools/")) {
            const match = id.match(/src\/tools\/([^/]+)/);
            if (match) return `tool-${match[1]}`;
          }
        },
      },
    },
  },
});
