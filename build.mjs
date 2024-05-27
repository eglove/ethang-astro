import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("ethang-astro", "main", {
  preVersionBumpScripts: ["UPDATE"],
  postVersionBumpScripts: ["DEDUPE", "LINT", "BUILD"],
  isLibrary: false,
});
