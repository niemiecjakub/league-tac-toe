import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/models/Game";

export interface CategoryFieldProps {
    onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: CategoryItem | null;
}

export default function CategoryBoardField({ onCellClick, value }: CategoryFieldProps) {
    console.log(`url('/${value?.ResourceKey}.JPG')`);
    return (
        <Button
            variant="destructive"
            className="h-16 w-16 font-bold bg-cover bg-center"
            onClick={onCellClick}
            style={{
                backgroundImage: value?.ResourceKey ? `url('/category/${value.ResourceKey}.JPG')` : `url('/lolIcon.svg')`,
            }}
        >
            {value && (
                <div className="flex flex-col text-sm text-white rounded">
                    <p>{value?.Category}</p>
                    <span>{value?.Name}</span>
                </div>
            )}
        </Button>
    );
}
