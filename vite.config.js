import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access (needed for ngrok)
    port: 5173, // Ensure this matches your local port
    strictPort: true, // Ensures Vite only runs on this port
    allowedHosts: ["00b2-43-230-212-145.ngrok-free.app"], // Add your ngrok URL here
  },
});
