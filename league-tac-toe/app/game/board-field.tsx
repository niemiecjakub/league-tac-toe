import { Button } from "@/components/ui/button";

export interface CategoryFieldProps {
    onCellClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: string | null;
    isCategory?: boolean;
}

export default function BoardField({ onCellClick, value, isCategory }: CategoryFieldProps) {
    return (
        <Button variant={isCategory ? "destructive" : "outline"} className="h-16 w-16 text-3xl font-bold" onClick={onCellClick}>
            {value !== null ? value : ""}
        </Button>
    );
}
