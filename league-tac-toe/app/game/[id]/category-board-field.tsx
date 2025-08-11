import { CategoryItem } from "@/models/Game";

export interface CategoryFieldProps {
    value?: CategoryItem | null;
}

export default function CategoryBoardField({ value }: CategoryFieldProps) {
    return (
        <div className="p-1 w-full h-full aspect-square bg-league-grey-200 flex flex-col items-center justify-center text-white">
            <img src={value?.ResourceKey ? `/category/${value.ResourceKey}.JPG` : "/lolIcon.svg"} className="w-3/4 h-3/4 object-contain opacity-90" alt={value?.Name || "default"} />
            <div className="text-center text-xs md:text-sm uppercase font-league">
                <p>{value?.Name}</p>
            </div>
        </div>
    );
}
