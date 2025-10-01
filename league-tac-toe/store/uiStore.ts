import { create } from "zustand";

export enum UiMode {
    LIGHT = "light",
    DARK = "dark",
}

type UiStore = {
    mode: UiMode;
    lang: string;
    setMode: (mode: UiMode) => void;
    setLang: (lang: string) => void;
};

export const LANG_KEY = "lang";
export const MODE_KEY = "uiMode";

const DEFAULT_LANG = "US";
const DEFAULT_MODE = UiMode.LIGHT;

export const SUPPORTED_CULTURES = [
    { code: "US", name: "English" },
    { code: "BR", name: "Brasil" },
    { code: "TR", name: "Türkçe " },
    { code: "AR", name: "Argentina" },
    { code: "RO", name: "Română" },
    { code: "PL", name: "Polski" },
    { code: "ES", name: "Español" },
    { code: "DE", name: "Deutsch" },
    { code: "FR", name: "Français" },
    { code: "IT", name: "Italiano" },
];

export const useUiStore = create<UiStore>((set) => ({
    mode: DEFAULT_MODE,
    lang: DEFAULT_LANG,

    setMode: (mode: UiMode) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(MODE_KEY, mode);
        }
        set({ mode });
    },

    setLang: (lang: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(LANG_KEY, lang);
        }
        set({ lang });
    },
}));
