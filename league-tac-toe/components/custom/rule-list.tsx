import RuleItem from "./rule-item";

const rules: string[] = [
    "A 3 x 3 square grid is lined up with criteria like legacy, position, resource, rangetype and region.",
    "Place your marker, an X or O, in one of the squares if you can name League of Legends champion that matches the criteria across the top row and left hand side.",
    "The first to get three in a row, vertically, horizontally or diagonally, is the winner.",
    "With steal mode enabled, each player has 3 steals in total, where a square can be stolen that is occupied by the opposing player.",
    "Infuriate your opponent and steal a square by naming a different champion to the champion already in the position on the grid.",
];

export default function RuleList() {
    return (
        <div className="w-full">
            <h2 className="font-bold text-xl my-2">How to play?</h2>
            <ul>
                {rules.map((rule, index) => (
                    <li key={index}>
                        <RuleItem rule={rule} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
