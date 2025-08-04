import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserUid(): string {
    if (typeof window !== "undefined") {
        let userToken = localStorage.getItem("token");
        if (!userToken) {
            userToken = crypto.randomUUID();
            localStorage.setItem("token", userToken);
        }
        return userToken;
    }
    return "";
}
