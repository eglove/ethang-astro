import config from "@ethang/eslint-config/eslint.config.js";
import tseslint from "typescript-eslint";
import configAstro from "@ethang/eslint-config-astro";

export default tseslint.config(...config, ...configAstro, {
  ignores: ["dist/"],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: "./tsconfig.json",
    },
  },
});
