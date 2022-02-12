import { DateTime } from "luxon";

export const formatDate = (date: string): string =>
  DateTime.fromISO(date).toFormat("yyyy-MM-dd");

export const isDateBefore = (dateA: string, dateB: string): boolean =>
  DateTime.fromISO(formatDate(dateA)) <= DateTime.fromISO(dateB);
