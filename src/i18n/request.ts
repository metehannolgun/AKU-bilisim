import { locale as getRouteLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  tr: async () => {
    const [base, pages, system] = await Promise.all([
      import("../messages/tr.json"),
      import("../messages/pages/tr.json"),
      import("../messages/system/tr.json"),
    ]);
    return { ...base.default, ...pages.default, ...system.default };
  },
  en: async () => {
    const [base, pages, system] = await Promise.all([
      import("../messages/en.json"),
      import("../messages/pages/en.json"),
      import("../messages/system/en.json"),
    ]);
    return { ...base.default, ...pages.default, ...system.default };
  },
};

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale ?? (await getRouteLocale());

  if (!hasLocale(routing.locales, currentLocale)) {
    notFound();
  }

  return {
    locale: currentLocale,
    messages: await messageLoaders[currentLocale](),
    timeZone: "Europe/Istanbul",
  };
});
