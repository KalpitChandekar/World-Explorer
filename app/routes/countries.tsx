import { Link } from "react-router";
import type { Route } from "./+types/countries";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";

export async function clientLoader() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,cca3,population,flags"
  );
  const data = await res.json();
  return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const filteredCountries = loaderData.filter((country: any) => {
    const matchesRegion =
      !region || country.region.toLowerCase() === region.toLowerCase();
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={region} onValueChange={(value) => setRegion(value)}>
          <SelectTrigger className="w-full h-full">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="america">America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredCountries.length === 0 ? (
        <div> No countries match your filters. </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCountries.map((country: any) => (
            <li
              key={country.cca3}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <Link to={`/countries/${country.name.common}`}>
                <div className="flex gap-2 justify-between group">
                  <div>
                    <h1 className="text-indigo-600 group-hover:underline text-lg font-semibold">
                      {country.name.common}
                    </h1>

                    <div className="text-gray-600 text-sm mt-1">
                      Region: {country.region} <br />
                      Population: {country.population.toLocaleString()}
                    </div>
                  </div>

                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    className="rounded w-24 h-auto object-cover self-center"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
