import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
