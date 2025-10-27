"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full mt-4 sticky bottom-0 z-50 text-sm md:text-xs flex justify-center items-center text-gray-400">
            <Link href="mailto:ksmietnik3@gmail.com" target="_blank" className="hover:opacity-40 flex">
                <Image src="/images/ahri.png" alt="ahri" width={12} height={12} />
                <p className="px-2">Feedback & bugs</p>
                <Image src="/images/ahri.png" alt="ahri" width={12} height={12} />
            </Link>
        </div>
    );
}
