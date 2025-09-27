// eslint.config.ts

import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";
import globals from "globals";
import sonarjs from "eslint-plugin-sonarjs";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  // --- 1. GLOBAL IGNORES ---
  // This block tells ESLint to completely ignore certain files and folders.
  // This is crucial for performance and to prevent linting build artifacts,
  // dependencies, or configuration files that don't need to be checked.
  {
    ignores: [
      "dist/",
      "src/shared/api/", // Generated API clients
      "src/shared/components/shadcn/", // Shadcn UI components
      "node_modules/",
      "__tests__/",
      "cypress/",
      "vite.config.ts",
      "tailwind.config.cjs",
    ],
  },

  // --- 2. GLOBAL RULES ---
  // These are the base recommended rules from ESLint that apply to all files
  // that are not ignored.
  eslint.configs.recommended,
  sonarjs.configs.recommended, // General bugs

  // --- 3a. TYPESCRIPT (non-React) SOURCE CODE CONFIGURATION ---
  // Strict, type-aware linting for .ts files only.
  {
    files: ["src/**/*.ts", "__testUtils__/**/*.ts"],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      unicorn: unicorn,
      import: pluginImport,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json", "./tsconfig.node.json"],
        },
        node: true,
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["memberLike", "parameter"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "objectLiteralProperty",
          format: ["camelCase", "PascalCase"],
        },
        { selector: "default", format: ["camelCase"] },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        {
          selector: "import",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "enumMember", format: ["snake_case"] },
      ],
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [{ pattern: "@**/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/no-duplicates": "error",
    },
  },

  // --- 3b. REACT + TYPESCRIPT (TSX) CONFIGURATION ---
  // React-specific rules and plugins for .tsx files.
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["src/**/*.tsx", "__testUtils__/**/*.tsx"],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      react: react,
      import: pluginImport,
      unicorn: unicorn,
    },
    languageOptions: {
      globals: { ...globals.browser, React: "readonly" },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
      },
    },
    settings: {
      react: { version: "detect" },
      "import/parsers": {
        "@typescript-eslint/parser": [".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json", "./tsconfig.node.json"],
        },
        node: true,
      },
    },
    rules: {
      // React core
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // React Refresh
      "react-refresh/only-export-components": "warn",
      // Preferences
      "react/prop-types": "off",
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      // Keep parity with TS rules for TSX files
      "no-console": ["error", { allow: ["warn", "error", "debug"] }],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["memberLike", "parameter"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "objectLiteralProperty",
          format: ["camelCase", "PascalCase"],
        },
        { selector: "default", format: ["camelCase"] },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        {
          selector: "import",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "enumMember", format: ["snake_case"] },
      ],
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [{ pattern: "@**/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/no-duplicates": "error",
    },
  },

  // --- 5. PRETTIER CONFIGURATION ---
  // This MUST be the last item. It disables any ESLint rules that conflict
  // with Prettier, letting Prettier handle all code formatting.
  prettierConfig,
]);
