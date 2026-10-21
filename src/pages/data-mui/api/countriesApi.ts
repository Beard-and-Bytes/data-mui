import { getJson } from './httpClient';
import {
  mapCountrySummary,
  mapCountry,
  type RawCountry,
} from '../utils/countryMappers';
import type { Country, CountrySummary } from '../types/country';

const ALL_COUNTRIES_URL =
  'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json';

const fetchAllRaw = () => getJson<RawCountry[]>(ALL_COUNTRIES_URL);

export const fetchCountries = async (): Promise<CountrySummary[]> => {
  const raw = await fetchAllRaw();
  return raw.map(mapCountrySummary);
};

export const fetchCountry = async (cca3: string): Promise<Country> => {
  const raw = await fetchAllRaw();
  const item = raw.find((c) => c.cca3 === cca3.toUpperCase());
  if (!item) throw new Error(`Country not found: ${cca3}`);
  return mapCountry(item);
};

export const fetchCountriesByCodes = async (codes: string[]): Promise<CountrySummary[]> => {
  const raw = await fetchAllRaw();
  const upper = new Set(codes.map((c) => c.toUpperCase()));
  return raw.filter((c) => upper.has(c.cca3)).map(mapCountrySummary);
};
