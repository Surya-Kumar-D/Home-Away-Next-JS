import { findCountryByCode } from "@/utils/countries";
function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode)!;
  const validName =
    validCountry.name.length > 20
      ? `${validCountry.name.substring(0, 20)}...`
      : validCountry.name;
  return (
    <div className="flex justify-between gap-2 text-sm items-center">
      {validCountry.flag} {validName}
    </div>
  );
}

export default CountryFlagAndName;
