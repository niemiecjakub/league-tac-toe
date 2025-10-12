import { defineRouting } from "next-intl/routing";

export const SUPPORTED_CULTURES = [
    { flagCode: "US", name: "English", langCode: "en" },
    { flagCode: "BR", name: "Brasil", langCode: "pt-BR" },
    { flagCode: "TR", name: "Türkçe", langCode: "tr" },
    { flagCode: "AR", name: "Argentina", langCode: "es-AR" },
    { flagCode: "RO", name: "Română", langCode: "ro" },
    { flagCode: "PL", name: "Polski", langCode: "pl" },
    { flagCode: "ES", name: "Español", langCode: "es" },
    { flagCode: "DE", name: "Deutsch", langCode: "de" },
    { flagCode: "FR", name: "Français", langCode: "fr" },
    { flagCode: "IT", name: "Italiano", langCode: "it" },
];

export const DEFAULT_LANG = SUPPORTED_CULTURES.find((c) => c.langCode === "en")!;
const locales = [...new Set(SUPPORTED_CULTURES.map((culture) => culture.langCode))];

export const routing = defineRouting({
    locales,
    defaultLocale: DEFAULT_LANG.langCode,
});
