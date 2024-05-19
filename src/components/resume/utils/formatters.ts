import { skillMap } from "./skills.ts";

export const unitFormat = new Intl.ListFormat("en-US", {
  type: "unit",
});

export const formatTech = (techs: string[]) => {
  const sorted = [...new Set(techs)]
    .map((tech) => {
      return skillMap[tech as keyof typeof skillMap];
    })
    .sort((a, b) => {
      return a.localeCompare(b);
    });

  return unitFormat.format(sorted);
};

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});
