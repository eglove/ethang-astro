import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("ethang-astro", "main", {
  scripts: ["UPDATE", "DEDUPE", "LINT", "BUILD"],
  isLibrary: false,
});
