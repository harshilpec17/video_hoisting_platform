import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed (in KiB)
  },

  server: {
    proxy: {
      "/url": {
        target: "https://youtubebackend-production-ec73.up.railway.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/url/, "/api/v1/users"),
      },
    },
  },
});

// target: "https://youtubebackend-production-ec73.up.railway.app",
//  target: "http://localhost:5173",
