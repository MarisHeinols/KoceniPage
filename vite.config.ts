import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    pool: "vmThreads",
    deps: {
      inline: [
        /@mui\/x-data-grid/, // bundle the DataGrid dependency instead of letting Vitest parse .css
        /@mui\/x-data-grid-pro/,
      ],
      web: {
        transformCss: false, // prevents Vitest from trying to parse .css in node_modules
      },
    },
  },
});