import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import standardWithTypescript from "eslint-config-standard-with-typescript";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect", // Deteksi versi React secara otomatis
      },
    },
    plugins: {
      react: pluginReactConfig,
    },
    extends: [
      "plugin:react/recommended",
      "standard-with-typescript",
      "prettier",
    ],
    rules: {
      // Tambahkan aturan kustom Anda di sini
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
