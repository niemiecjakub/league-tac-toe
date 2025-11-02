import { CategoryItem } from "@/models/Game";
import Image from "next/image";
import rawCategoryMap from "@/data/categoryImages.json";

export interface CategoryFieldProps {
    value?: CategoryItem | null;
}

export default function CategoryBoardField({ value }: CategoryFieldProps) {
    const categoryMap = rawCategoryMap as Record<string, string>;

    return (
        <div className="p-1 w-full h-full aspect-square bg-league-grey-200 flex flex-col items-center justify-center text-white">
            <Image
                // src={value?.ResourceKey ? `/category/${value.ResourceKey}.JPG` : "/lolIcon.svg"}
                src={value?.ResourceKey ? `/category/${categoryMap[value?.ResourceKey ?? ""]}` : "/lolIcon.svg"}
                alt={value?.Name || "default"}
                className="w-3/4 h-3/4 object-contain opacity-90"
                width={450}
                height={450}
            />
            <div className="text-center text-xs md:text-sm uppercase font-league">
                <p>{value?.Name}</p>
            </div>
        </div>
    );
}
