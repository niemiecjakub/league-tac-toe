"use client";

import { UiMode } from "@/components/custom/navbar";
import { BuyMeACoffeeIcon, EmailIcon, GithubIcon, LinkedinIcon } from "@/components/svg/svg-icons";
import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const acknowledgments = [
    { href: "https://playfootball.games/footy-tic-tac-toe/", text: "Tiki taka toe" },
    { href: "https://developer.riotgames.com/docs/lol", text: "Data dragon" },
    { href: "https://lol.fandom.com", text: "Leaguepedia" },
];

export default function AboutPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="h-full w-full md:w-1/2 flex flex-col md:justify-center mt-10 items-center gap-6 px-4">
            <section className="space-y-1  flex flex-col ">
                <div className="text-center">
                    <p>Found a bug or have an idea for improvement?</p>
                    <p>Want to contribute code or translations? </p>
                </div>
                <p>Contact me directly or open an issue/pull request on GitHub.</p>
                <div className="flex items-center justify-center gap-4">
                    <Link href="https://www.linkedin.com/in/niemiecjakub/" target="_blank" className="hover:opacity-40">
                        <LinkedinIcon className="h-10 w-10" />
                    </Link>
                    <Link href="mailto:ksmietnik3@gmail.com" target="_blank" className="hover:opacity-40">
                        <EmailIcon className="h-12 w-12" fill={mounted && theme == UiMode.DARK ? "#FFFFFF" : "#000000"} />
                    </Link>
                    <Link href="https://github.com/niemiecjakub/league-tac-toe" target="_blank" className="hover:opacity-40">
                        <GithubIcon className="h-10 w-10 inline" fill={mounted && theme == UiMode.DARK ? "#FFFFFF" : "#000000"} />
                    </Link>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-center">Acknowledgments</h2>
                <ul className="space-y-2">
                    {acknowledgments.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Image src="/images/ahri.png" alt="ahri" width={24} height={24} />
                            <Link href={item.href} target="_blank">
                                <p>{item.text}</p>
                            </Link>
                            <Image src="/images/ahri.png" alt="ahri" width={24} height={24} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-3 flex flex-col items-center">
                <p className="flex items-center justify-center gap-2">If you enjoy the project, consider leaving a donation to help me keep the project up. ❤️</p>
                <Link href="https://buymeacoffee.com/kniemiec3p" target="_blank" className="hover:opacity-40">
                    <BuyMeACoffeeIcon className="w-[200px] pointer" />
                </Link>
            </section>
        </div>
    );
}
