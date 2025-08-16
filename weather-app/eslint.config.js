import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": eslintPluginTs,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      // Biến không dùng -> warning
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // Import không dùng -> warning
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
