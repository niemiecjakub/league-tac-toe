import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/models/Game";

export interface CategoryFieldProps {
    onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: CategoryItem | null;
}

export default function CategoryBoardField({ onCellClick, value }: CategoryFieldProps) {
    return (
        <Button variant="destructive" className="h-16 w-16 font-bold" onClick={onCellClick}>
            {value && (
                <div>
                    <p>{value?.Category}</p>
                    <span>{value?.Name}</span>
                </div>
            )}
        </Button>
    );
}
