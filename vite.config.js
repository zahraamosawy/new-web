import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // ← هذا أهم سطر

  server: {
    proxy: {
      "/api": {
        target: "https://fg.com.iq",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
