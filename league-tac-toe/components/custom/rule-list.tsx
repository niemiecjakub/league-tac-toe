import RuleItem from "./rule-item";
import { useTranslations } from "next-intl";

export default function RuleList() {
    const t = useTranslations("home");
    const rules = t.raw("rules") as string[];

    return (
        <div className="w-full">
            <h2 className="font-bold text-xl my-2">{t("howToPlay")}</h2>
            <ul>
                {rules.map((rule, index) => (
                    <li key={index}>
                        <RuleItem rule={rule} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
