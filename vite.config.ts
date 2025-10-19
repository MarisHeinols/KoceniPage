import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"], // 👈 add this
    pool: "vmThreads",

    deps: {
      inline: [
        /@mui\/x-data-grid/,
        /@mui\/x-data-grid-pro/,
      ],
      web: {
        transformCss: false, // 👈 critical: don't parse CSS imports
      },
    },
  },

  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
