import type { Session } from "@supabase/supabase-js";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FILTER } from "types/misc";

export const SessionContext = createContext<Session | null>(null);
export const RoleContext = createContext("");

type filterSettings = {
  filter: FILTER;
  setFilter: Dispatch<SetStateAction<FILTER>>;
  filterArg: string;
  setFilterArg: Dispatch<SetStateAction<string>>;
};

// @ts-expect-error
export const FilterContext = createContext<filterSettings>(undefined);
