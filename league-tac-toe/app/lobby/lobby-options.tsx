"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRoom, findRandomOpponent } from "@/services/gameService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RoomOptions } from "@/models/Room";

export function LobbyOptions() {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [newRoomOptions, setNewRoomOptions] = useState<RoomOptions>({
        turnTime: -1,
        stealsEnabled: true,
        isPublic: false,
    });

    const handleRoomCreate = async () => {
        console.log("Creating room...");
        var room = await createRoom(newRoomOptions);
        console.log("Room created:", room);
        router.push(`/game/${room.roomGuid}`);
    };

    const handleRoomJoin = async (roomGuid: string) => {
        console.log("Joining room...");
        router.push(`/game/${roomGuid}`);
    };

    const handleFindRandomOpponent = async () => {
        var room = await findRandomOpponent();
        router.push(`/game/${room.roomGuid}`);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Join existing room</CardTitle>
                    <CardDescription>Enter room code and join game</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input id="roomCode" type="text" placeholder="Room code" required value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={() => handleRoomJoin(roomCode)} disabled={!roomCode.trim()}>
                        Join
                    </Button>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create room</CardTitle>
                    <CardDescription>Challenge a friend to an online game</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 justify-between">
                            <Label>Time per turn</Label>
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
                                    <SelectValue placeholder="Unlimtied" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Time per turn</SelectLabel>
                                        <SelectItem value="-1">Unlimited</SelectItem>
                                        <SelectItem value="15">15 Seconds</SelectItem>
                                        <SelectItem value="30">30 Seconds</SelectItem>
                                        <SelectItem value="45">45 Seconds</SelectItem>
                                        <SelectItem value="60">60 Seconds</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <Label>Enable steals</Label>
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
                                    <SelectValue placeholder="Yes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Enable steals</SelectLabel>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleRoomCreate}>
                        Create
                    </Button>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Find an opponent</CardTitle>
                    <CardDescription>Play against a random opponent</CardDescription>
                </CardHeader>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleFindRandomOpponent}>
                        Start
                    </Button>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Same screen game</CardTitle>
                    <CardDescription>Play against a friend on the same device</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex gap-2 justify-between">
                            <Label>Time per turn</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Unlimtied" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Time per turn</SelectLabel>
                                        <SelectItem value="-1">Unlimited</SelectItem>
                                        <SelectItem value="15">15 Seconds</SelectItem>
                                        <SelectItem value="30">30 Seconds</SelectItem>
                                        <SelectItem value="45">45 Seconds</SelectItem>
                                        <SelectItem value="60">60 Seconds</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <Label>Enable steals</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Yes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Enable steals</SelectLabel>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={() => alert("Same screen room functionality not implemented yet")}>
                        Start
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
