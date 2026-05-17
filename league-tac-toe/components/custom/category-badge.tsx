import Image from "next/image";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { getCategoryImageSrc } from "@/lib/categoryIcon";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface CategoryBadgeProps {
    categoryGroup: string;
    label: string;
    variant?: VariantProps<typeof badgeVariants>["variant"];
    className?: string;
}

export function CategoryIcon({ categoryGroup, label, className }: { categoryGroup: string; label: string; className?: string }) {
    const src = getCategoryImageSrc(categoryGroup, label);

    if (!src) {
        return <Image src="/lolIcon.svg" alt="" width={14} height={14} className={cn("size-3.5 shrink-0 object-contain opacity-70", className)} />;
    }

    return <Image src={src} alt="" width={14} height={14} className={cn("size-3.5 shrink-0 object-contain", className)} />;
}

export function CategoryBadge({ categoryGroup, label, variant = "outline", className }: CategoryBadgeProps) {
    return (
        <Badge variant={variant} className={cn("gap-1.5 pl-1", className)}>
            <CategoryIcon categoryGroup={categoryGroup} label={label} />
            {label}
        </Badge>
    );
}
