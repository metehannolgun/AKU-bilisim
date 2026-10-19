export function getSiteOrigin(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return undefined;
  }

  const url = new URL(value);

  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) site URL.");
  }

  return url.origin;
}
