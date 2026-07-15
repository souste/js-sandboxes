import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "error", // Lights up red if you forget to use a hashed variable
      "no-sequences": "error", // Catches the accidental comma validation bug instantly
    },
  },
]);
