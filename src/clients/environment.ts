import { z } from "zod";

export const environment = z
  .object({
    DATABASE_URL: z.string().optional(),
    YNAB_KEY: z.string().optional(),
  })
  .parse(import.meta.env);
