import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (date: Date | number) => format(date, "yyyy-MM-dd");

export const endsIn = (date: Date | number) => formatDistanceToNow(date);
