import type { Country, CountrySummary } from '../types/country';

export type RawCountrySummary = {
  cca2: string;
  cca3: string;
  name: { common: string; official: string };
  region: string;
  capital?: string[];
  area: number;
};

export type RawCountry = RawCountrySummary & {
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones?: string[];
  borders?: string[];
};

const flagPng = (cca2: string) =>
  `https://flagcdn.com/w80/${cca2.toLowerCase()}.png`;

export const mapCountrySummary = (raw: RawCountrySummary): CountrySummary => ({
  cca3: raw.cca3,
  name: raw.name,
  flags: { png: flagPng(raw.cca2) },
  region: raw.region,
  capital: raw.capital ?? [],
  area: raw.area,
});

export const mapCountry = (raw: RawCountry): Country => ({
  ...mapCountrySummary(raw),
  subregion: raw.subregion ?? '',
  languages: Object.values(raw.languages ?? {}),
  currencies: Object.values(raw.currencies ?? {}).map((c) => ({
    name: c.name,
    symbol: c.symbol,
  })),
  timezones: raw.timezones ?? [],
  borders: raw.borders ?? [],
});
