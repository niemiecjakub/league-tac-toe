import { getChampions } from "@/services/championService";

export default async function Home() {
    const champions = await getChampions();

    return (
        <div>
            <h1>Welcome</h1>
            <ul>
                {champions.map((champion) => (
                    <li key={champion.id}>{champion.name}</li>
                ))}
            </ul>
        </div>
    );
}
