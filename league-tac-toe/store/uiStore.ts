import { create } from "zustand";

export enum UiMode {
    LIGHT = "light",
    DARK = "dark",
}

type UiStore = {
    mode: UiMode;
    setMode: (mode: UiMode) => void;
};

export const MODE_KEY = "uiMode";
const DEFAULT_MODE = UiMode.LIGHT;

export const SUPPORTED_CULTURES = [
    { flagCode: "US", name: "English", langCode: "en" },
    { flagCode: "BR", name: "Brasil", langCode: "en" },
    { flagCode: "TR", name: "Türkçe ", langCode: "en" },
    { flagCode: "AR", name: "Argentina", langCode: "en" },
    { flagCode: "RO", name: "Română", langCode: "en" },
    { flagCode: "PL", name: "Polski", langCode: "en" },
    { flagCode: "ES", name: "Español", langCode: "en" },
    { flagCode: "DE", name: "Deutsch", langCode: "de" },
    { flagCode: "FR", name: "Français", langCode: "en" },
    { flagCode: "IT", name: "Italiano", langCode: "en" },
];

export const useUiStore = create<UiStore>((set) => ({
    mode: DEFAULT_MODE,

    setMode: (mode: UiMode) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(MODE_KEY, mode);
        }
        set({ mode });
    },
}));
