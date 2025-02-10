import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Frontend will run on http://localhost:3000
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ✅ Redirects API requests to backend
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:5000", // ✅ Redirects Google OAuth requests
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
