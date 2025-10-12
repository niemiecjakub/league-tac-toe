"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { findRandomOpponent } from "@/services/gameService";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LobbyRandom() {
    const router = useRouter();
    const t = useTranslations("home");
    const handleFindRandomOpponent = async () => {
        var room = await findRandomOpponent();
        router.push(`/game/${room.roomGuid}`);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{t("lobby.random.title")}</CardTitle>
                <CardDescription>{t("lobby.random.description")}</CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={handleFindRandomOpponent}>
                    {t("start")}
                </Button>
            </CardFooter>
        </Card>
    );
}
