import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  resolve: {
    alias: {
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/auth": path.resolve(__dirname, "./src/features/auth"),
      "@/course": path.resolve(__dirname, "./src/features/course"),
      "@/user": path.resolve(__dirname, "./src/features/user"),
    },
  },
});
