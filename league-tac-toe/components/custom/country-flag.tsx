type CountryFlagProps = {
    countryCode: string;
    className?: string;
    alt: string;
};

export default function CountryFlag({ countryCode, alt, className }: CountryFlagProps) {
    return <img alt={alt} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`} className={className} />;
}
