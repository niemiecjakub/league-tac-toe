"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function LobbyLocal() {
    const t = useTranslations("home");
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
                        <Select>
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
                        <Select>
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
                <Button type="submit" className="w-full" onClick={() => alert("Same screen room functionality not implemented yet")}>
                    {t("start")}
                </Button>
            </CardFooter>
        </Card>
    );
}
