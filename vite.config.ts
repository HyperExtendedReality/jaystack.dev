import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set the base path for GitHub Pages.
  // The value should be the name of your repository.
  base: "/jaystack.dev/",

  plugins: [
    react(),
    // This conditional plugin now works correctly because `mode` is
    // properly destructured from the function arguments.
    // It will only be active during development (`vite dev`).
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // The server config is for local development and doesn't affect the build.
  server: {
    host: "::",
    port: 8080,
  },
}));
