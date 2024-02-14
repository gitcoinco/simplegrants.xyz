import locale from "date-fns/locale/en-US";
import {
  type FormatDistanceToken,
  format,
  formatDistanceToNow,
  isSameDay,
} from "date-fns";

export const formatDate = (date: Date | number) => format(date, "yyyy-MM-dd");

export const formatRange = (startsAt: Date, endsAt?: Date | null) =>
  endsAt
    ? isSameDay(startsAt, endsAt)
      ? formatDate(startsAt) + " - " + format(endsAt, "HH:mm")
      : formatDate(startsAt) + " - " + formatDate(endsAt)
    : formatDate(startsAt);

export const timeAgo = (
  d: Date,
  opts: { short: boolean } = { short: true },
) => {
  const formatDistance = opts.short
    ? formatDistanceShort
    : locale.enUS.formatDistance;

  return formatDistanceToNow(d, {
    addSuffix: !opts.short,
    locale: {
      ...locale,
      formatDistance,
    },
  });
};

function formatDistanceShort(
  token: FormatDistanceToken,
  count: number,
): string {
  return formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", String(count));
}

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};
