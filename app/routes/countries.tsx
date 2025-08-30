import { useEffect, useState } from "react";

type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  flags: { png: string };
  population: number;
};

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-md:px-4">
      {countries.map((country) => (
        <div
          key={country.name.common}
          className="p-4 shadow rounded-lg bg-white"
        >
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full h-28 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{country.name.common}</h2>
          <p className="text-sm text-gray-600">
            Capital: {country.capital ? country.capital[0] : "N/A"}
          </p>
          <p className="text-sm text-gray-600">Region: {country.region}</p>
          <p className="text-sm text-gray-600">
            Population: {country.population.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
