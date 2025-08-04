"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { findRandomOpponent } from "@/services/gameService";
import { useRouter } from "next/navigation";

export default function LobbyRandom() {
    const router = useRouter();

    const handleFindRandomOpponent = async () => {
        var room = await findRandomOpponent();
        router.push(`/game/${room.roomGuid}`);
    };

    return (
        <>
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
        </>
    );
}
