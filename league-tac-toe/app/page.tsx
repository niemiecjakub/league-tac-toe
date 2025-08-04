import Link from "next/link";

export default async function Home() {
    return (
        <>
            <Link href="/champions" className="text-blue-600 underline">
                Champions
            </Link>
            <Link href="/lobby/local" className="text-blue-600 underline">
                local
            </Link>
            <Link href="/lobby/online" className="text-blue-600 underline">
                online
            </Link>
            <Link href="/lobby/random" className="text-blue-600 underline">
                random
            </Link>
        </>
    );
}
