import { TZDate } from "@date-fns/tz";
import { formatRelative } from "date-fns";

//Supabase defaults to UTC 0 & recommends not changing this, so it has to be updated
export function convertToSGTime(date: Date): Date {
  const singaporeDateTime = new TZDate(date, "+08:00");
  return singaporeDateTime;
}

export function formatRelativeToToday(date: Date): string {
  return formatRelative(date, new Date()).toString();
}
