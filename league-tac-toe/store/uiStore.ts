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

export const useUiStore = create<UiStore>((set) => ({
    mode: DEFAULT_MODE,

    setMode: (mode: UiMode) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(MODE_KEY, mode);
        }
        set({ mode });
    },
}));
