import { create } from "zustand";

interface FeedbackTooltipStore {
    isOpen: boolean;
    show: () => void;
    hide: () => void;
}

export const useFeedbackTooltipStore = create<FeedbackTooltipStore>((set) => ({
    isOpen: false,
    show: () => set({ isOpen: true }),
    hide: () => set({ isOpen: false }),
}));
