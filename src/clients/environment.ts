import { z } from "zod";

export const environment = z
  .object({
    DATABASE_URL: z.string(),
    YNAB_KEY: z.string(),
  })
  .parse(import.meta.env);
