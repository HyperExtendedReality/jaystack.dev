import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/jaystack.dev/",
  plugins: [
    tailwindcss(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    host: "::",
    port: 8080,
  },
}));
