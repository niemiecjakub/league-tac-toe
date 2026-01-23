import Image from "next/image";

type CountryFlagProps = {
    countryCode: string;
    className?: string;
    alt: string;
    height: number;
    width: number;
};

export default function CountryFlag({ countryCode, alt, className, height, width }: CountryFlagProps) {
    const altText = alt.includes("Flag") ? alt : `Flag of ${alt}`;
    return <Image alt={altText} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`} className={className} width={width} height={height} />;
}
