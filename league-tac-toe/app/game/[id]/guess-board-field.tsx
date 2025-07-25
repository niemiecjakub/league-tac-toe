import { Button } from "@/components/ui/button";
import { Player } from "@/models/Game";

export interface GuessBoardField {
    onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: Player | null;
}

export default function GuessBoardField({ onCellClick, value }: GuessBoardField) {
    return (
        <Button variant="outline" className="h-16 w-16 text-3xl font-bold" onClick={onCellClick}>
            {value && <div>{value}</div>}
        </Button>
    );
}
