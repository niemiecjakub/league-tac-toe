import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Rounds counts for display (e.g. 5555 → 5550, 21 → 21). */
export function getRoundedCount(value: number): number {
    return value >= 1_000 ? Math.floor(value / 10) * 10 : value;
}

/** Rounds counts for display (e.g. 5555 → "5,550", 21 → "21"). */
export function formatRoundedCount(value: number, locale = "en"): string {
    return getRoundedCount(value).toLocaleString(locale);
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
