import rawCategoryMap from "@/data/categoryImages.json";

const categoryMap = rawCategoryMap as Record<string, string>;

export const CHAMPION_COLUMN_CATEGORY_GROUP: Record<string, string> = {
    resource: "resources",
    region: "region",
    legacies: "legacy",
    positions: "position",
    rangeTypes: "rangetype",
};

export function toCategoryResourceKey(categoryGroup: string, optionName: string): string {
    return `${categoryGroup.toLowerCase().replace(/\s/g, "")}/${optionName.toLowerCase().replace(/\s/g, "")}`;
}

export function getCategoryImageSrc(categoryGroup: string, optionName: string): string | null {
    const resourceKey = toCategoryResourceKey(categoryGroup, optionName);
    const imagePath = categoryMap[resourceKey];
    return imagePath ? `/category/${imagePath}` : null;
}
