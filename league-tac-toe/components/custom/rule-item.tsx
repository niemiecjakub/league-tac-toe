import Image from "next/image";

interface RuleItemProps {
    rule: string;
}

export default function RuleItem({ rule }: RuleItemProps) {
    return (
        <div className="flex items-start">
            <Image src="/images/ezreal.png" alt="Poro Icon" className="inline-block mr-2" width={16} height={16} />
            <p className="text-xs md:text-sm">{rule}</p>
        </div>
    );
}
