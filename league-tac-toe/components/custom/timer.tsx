"use client";
import { useTranslations } from "next-intl";
import { useRoomStore } from "@/store/roomStore";

export default function Timer() {
    const t = useTranslations("game.dashboard");
    const { room, turnTimeLeft } = useRoomStore((state) => state);
    return <>{room?.turnTime == null ? <p>{t("noTimeLimit")}</p> : <p className="text-sm text-gray-500">{turnTimeLeft}</p>}</>;
}
