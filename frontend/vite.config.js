import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/url": {
        target: "http://localhost:8000/api/v1/users",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/url/, ""),
      },
    },
  },
});
