import { locale as getRouteLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  tr: () => import("../messages/tr.json").then((module) => module.default),
  en: () => import("../messages/en.json").then((module) => module.default),
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