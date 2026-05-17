"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createLocalRoom } from "@/services/gameService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RoomOptions } from "@/models/Room";
import { useTranslations } from "next-intl";
import { Spinner } from "../ui/spinner";
import { useRoomStore } from "@/store/roomStore";
import { toast } from "react-toastify";
import { handleServiceError } from "@/lib/errorHandler";

export default function LobbyLocal() {
    const t = useTranslations("home");
    const router = useRouter();
    const [roomOptions, setRoomOptions] = useState<RoomOptions>({
        turnTime: -1,
        stealsEnabled: true,
        includeEsportCategories: true,
        isPublic: false,
    });
    const [isStarting, setIsStarting] = useState(false);
    const setRoom = useRoomStore((state) => state.setRoom);

    const handleStart = async () => {
        try {
            setIsStarting(true);
            const room = await createLocalRoom(roomOptions);
            setRoom(room);
            router.push(`/game/local/${room.roomGuid}`);
        } catch (error: unknown) {
            toast.error(handleServiceError(error));
            setIsStarting(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{t("lobby.local.title")}</CardTitle>
                <CardDescription>{t("lobby.local.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 ">
                    <div className="flex gap-2 justify-between">
                        <Label>{t("timePerTurn")}</Label>
                        <Select
                            value={roomOptions.turnTime?.toString() ?? "-1"}
                            onValueChange={(value) =>
                                setRoomOptions((prev) => ({
                                    ...prev,
                                    turnTime: parseInt(value),
                                }))
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t("unlimited")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{t("timePerTurn")}</SelectLabel>
                                    <SelectItem value="-1">{t("unlimited")}</SelectItem>
                                    <SelectItem value="15">{t("limited", { number: 15 })}</SelectItem>
                                    <SelectItem value="30">{t("limited", { number: 30 })}</SelectItem>
                                    <SelectItem value="45">{t("limited", { number: 45 })}</SelectItem>
                                    <SelectItem value="60">{t("limited", { number: 60 })}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <Label>{t("enableSteals")}</Label>
                        <Select
                            value={roomOptions.stealsEnabled.toString()}
                            onValueChange={(value) =>
                                setRoomOptions((prev) => ({
                                    ...prev,
                                    stealsEnabled: value === "true",
                                }))
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t("yes")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{t("enableSteals")}</SelectLabel>
                                    <SelectItem value="true">{t("yes")}</SelectItem>
                                    <SelectItem value="false">{t("no")}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={handleStart} disabled={isStarting}>
                    {isStarting ? (
                        <>
                            <Spinner />
                            {t("lobby.local.starting")}
                        </>
                    ) : (
                        t("start")
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
