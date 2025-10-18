"use client";

import { useTranslations } from "next-intl";
import { useRoomStore } from "@/store/roomStore";

export default function Timer() {
    const t = useTranslations("game.dashboard");
    const { room, turnTimeLeft } = useRoomStore((state) => state);
    return room?.turnTime == null ? <span className="text-sm text-gray-600">{t("noTimeLimit")}</span> : <span className="text-lg font-semibold">00:{String(turnTimeLeft).padStart(2, "0")}</span>;
}
