import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Rounds counts for display (e.g. 5234 → "5,000", 21 → "21"). */
export function formatRoundedCount(value: number, locale = "en"): string {
    const rounded = value >= 1_000 ? Math.floor(value / 1_000) * 1_000 : value;
    return rounded.toLocaleString(locale);
}

export function getUserUid(): string {
    if (typeof window !== "undefined") {
        let userToken = localStorage.getItem("token");
        if (!userToken) {
            userToken = v4();
            localStorage.setItem("token", userToken);
        }
        return userToken;
    }
    return "";
}
