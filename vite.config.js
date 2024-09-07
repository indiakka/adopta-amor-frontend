import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/pets": {
        target: "http://localhost:4001", // El backend donde están los datos
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
