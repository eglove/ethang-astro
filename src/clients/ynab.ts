import ynab from "ynab";

import { environment } from "./environment.ts";

export const ynabClient = new ynab.API(environment.YNAB_KEY);
