"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface MessagesProps {
    messages: string[];
}
export default function Messages({ messages }: MessagesProps) {
    const t = useTranslations("home");

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                    <div className="flex flex-col">
                        {messages
                            .slice()
                            .reverse()
                            .map((msg, index) => (
                                <div key={index} className="w-full border-b border-gray-200 last:border-0 pb-1">
                                    {msg}
                                </div>
                            ))}
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
