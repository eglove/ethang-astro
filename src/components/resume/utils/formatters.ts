import map from "lodash/map";

import { skillMap } from "./skills.ts";

export const unitFormat = new Intl.ListFormat("en-US", {
  type: "unit",
});

export const formatTech = (techs: readonly string[]) => {
  const sorted = map([...new Set(techs)], (tech) => {
    return skillMap[tech as keyof typeof skillMap];
  }).sort((a, b) => {
    return a.localeCompare(b);
  });

  return unitFormat.format(sorted);
};

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});
