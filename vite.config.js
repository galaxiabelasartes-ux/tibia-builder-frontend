import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-dnd", "react-dnd-html5-backend"],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
