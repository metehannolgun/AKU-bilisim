import type { NextConfig } from "next";
import { homedir } from "node:os";
import { join } from "node:path";

const nextConfig: NextConfig = {};

export default async function configureNext(): Promise<NextConfig> {
  // SWC requires a trusted cache path; shared Windows cache ACLs can fail this check.
  if (process.platform === "win32" && !process.env.SWC_NATIVE_BINDING_CACHE) {
    process.env.SWC_NATIVE_BINDING_CACHE = join(
      homedir(),
      ".cache",
      "aku-bilisim-swc",
    );
  }

  // Load the plugin after setting the cache path, before SWC initializes.
  const { default: createNextIntlPlugin } = await import("next-intl/plugin");
  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

  return withNextIntl(nextConfig);
}
