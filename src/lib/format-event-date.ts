export function formatEventDate(
  value: string | null,
  locale = "tr",
): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(date);
}