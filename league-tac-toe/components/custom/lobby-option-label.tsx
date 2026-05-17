import Image from "next/image";
import { Label } from "@/components/ui/label";
import { type ReactNode } from "react";

export default function LobbyOptionLabel({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            <Image src="/images/poro.png" alt="" width={20} height={20} className="shrink-0" aria-hidden />
            <Label>{children}</Label>
        </div>
    );
}
