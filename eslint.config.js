import config from "@ethang/eslint-config/eslint.config.js";
import configAstro from "@ethang/eslint-config/config.astro.js";
import tseslint from "typescript-eslint";

export default tseslint.config(...config, ...configAstro, {
  ignores: ["dist/"],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: "./tsconfig.json",
    },
  },
});
