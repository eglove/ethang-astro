import config from "@ethang/eslint-config/eslint.config.js";
import tseslint from "typescript-eslint";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default tseslint.config(...config, {
  ignores: ["dist/"],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: "./tsconfig.json",
    },
  },
});
