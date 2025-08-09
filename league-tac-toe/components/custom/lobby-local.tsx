"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function LobbyLocal() {
    return (
        <Card className="w-full">
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
    );
}
