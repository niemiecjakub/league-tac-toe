import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LobbyOnline from "@/components/custom/lobby-online";
import LobbyRandom from "@/components/custom/lobby-random";
import LobbyLocal from "@/components/custom/lobby-local";
import RuleList from "@/components/custom/rule-list";

export default async function Home() {
    return (
        <div className="w-full md:w-2/3 2xl:w-2/5 h-full flex items-center flex-col gap-0.5">
            <div className="flex gap-4 items-baseline justify-center py-4">
                <img src="/images/poro.png" alt="Poro Icon" className="h-[32px]" />
                <h1 className="text-center text-4xl lg:text-6xl font-extrabold tracking-tight text-balance">League Tac Toe</h1>
                <img src="/images/poro.png" alt="Poro Icon" className="h-[32px]" />
            </div>
            <p className="text-xs">League of Legends Quiz meets Tic-Tac-Toe.</p>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xs lg:text-lg">Name champions matching categories to claim squares in a 3x3 grid.</p>
                <p className="text-xs lg:text-lg">Enable Steal Mode to swipe your opponent's square.</p>
            </div>
            <div className="flex w-full flex-col gap-6 my-4">
                <Tabs defaultValue="online">
                    <TabsList className="w-full">
                        <TabsTrigger value="online">Online</TabsTrigger>
                        <TabsTrigger value="random">Random opponent</TabsTrigger>
                        <TabsTrigger value="local">Same screen</TabsTrigger>
                    </TabsList>
                    <TabsContent value="online">
                        <LobbyOnline />
                    </TabsContent>
                    <TabsContent value="random">
                        <LobbyRandom />
                    </TabsContent>
                    <TabsContent value="local">
                        <LobbyLocal />
                    </TabsContent>
                </Tabs>
            </div>
            <RuleList />
        </div>
    );
}
