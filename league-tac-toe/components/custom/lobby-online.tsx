"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRoom } from "@/services/gameService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RoomOptions } from "@/models/Room";
import { useTranslations } from "next-intl";
import { Spinner } from "../ui/spinner";
import { useRoomStore } from "@/store/roomStore";
import { toast } from "react-toastify";
import { handleServiceError } from "@/lib/errorHandler";

export default function LobbyOnline() {
    const t = useTranslations("home");
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [newRoomOptions, setNewRoomOptions] = useState<RoomOptions>({
        turnTime: -1,
        stealsEnabled: true,
        includeEsportCategories: true,
        isPublic: false,
    });
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const { joinRoom } = useRoomStore((state) => state);

    const handleRoomCreate = async () => {
        try {
            setIsCreatingRoom(true);
            const room = await createRoom(newRoomOptions);
            await joinRoom(room.roomGuid);
            router.push(`/game/${room.roomGuid}`);
        } catch (error: unknown) {
            toast.error(handleServiceError(error));
            setIsCreatingRoom(false);
        }
    };

    const handleRoomJoin = async (roomGuid: string) => {
        try {
            setIsJoining(true);
            await joinRoom(roomGuid);
            router.push(`/game/${roomGuid}`);
        } catch (error: unknown) {
            toast.error(handleServiceError(error, "Room code must be a valid GUID"));
            setIsJoining(false);
        }
    };
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{t("lobby.online.joinRoom.title")}</CardTitle>
                <CardDescription>{t("lobby.online.joinRoom.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Input id="roomCode" type="text" placeholder="Room code" required value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={() => handleRoomJoin(roomCode)} disabled={!roomCode.trim() || isJoining}>
                    {isJoining ? (
                        <>
                            <Spinner />
                            {t("lobby.online.joinRoom.joining")}
                        </>
                    ) : (
                        `${t("lobby.online.joinRoom.join")}`
                    )}
                </Button>
            </CardFooter>
            <CardHeader>
                <CardTitle>{t("lobby.online.createRoom.title")}</CardTitle>
                <CardDescription>{t("lobby.online.createRoom.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 justify-between">
                        <Label>{t("timePerTurn")}</Label>
                        <Select
                            value={newRoomOptions?.turnTime?.toString() ?? "-1"}
                            onValueChange={(value) =>
                                setNewRoomOptions((prev) => ({
                                    ...prev!,
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
                            value={newRoomOptions.stealsEnabled.toString()}
                            onValueChange={(value) =>
                                setNewRoomOptions((prev) => ({
                                    ...prev!,
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
                    <div className="flex gap-2 justify-between">
                        <Label>{t("includeEsportCategories")}</Label>
                        <Select
                            value={newRoomOptions.includeEsportCategories.toString()}
                            onValueChange={(value) =>
                                setNewRoomOptions((prev) => ({
                                    ...prev!,
                                    includeEsportCategories: value === "true",
                                }))
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t("yes")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{t("includeEsportCategories")}</SelectLabel>
                                    <SelectItem value="true">{t("yes")}</SelectItem>
                                    <SelectItem value="false">{t("no")}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={handleRoomCreate} disabled={isCreatingRoom}>
                    {isCreatingRoom ? (
                        <>
                            <Spinner />
                            {t("lobby.online.createRoom.creating")}
                        </>
                    ) : (
                        `${t("lobby.online.createRoom.create")}`
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
