import { format, formatDistanceToNowStrict, isDate, isAfter } from "date-fns";

export const formatDate = (date?: Date | number) =>
  isDate(date) ? format(date, "dd MMM yyyy") : "";

export const endsIn = (date?: Date | number, text?: string[]) => {
  if (!isDate(date)) return "";
  const prefix = isAfter(date, new Date()) ? text?.[0] : text?.[1];
  return `${prefix} ${formatDistanceToNowStrict(date, { addSuffix: true })}`;
};
