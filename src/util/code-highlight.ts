// eslint-disable-next-line barrel/avoid-importing-barrel-files
import { codeToHtml } from "shiki";

export async function codeHighlight (
  text: string,
  theme = "night-owl",
  lang = "typescript",
) {
  return codeToHtml(text, {
    lang,
    theme,
  });
}
