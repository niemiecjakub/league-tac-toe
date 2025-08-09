interface RuleItemProps {
    rule: string;
}

export default function RuleItem({ rule }: RuleItemProps) {
    return (
        <div className="flex items-start">
            <img src="/images/poro.png" alt="Poro Icon" className="h-[16px] inline-block mr-2" />
            <p className="text-sm">{rule}</p>
        </div>
    );
}
