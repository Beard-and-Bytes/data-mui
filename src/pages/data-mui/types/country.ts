export type PopulationPoint = {
  year: number;
  value: number;
};

export type CountrySummary = {
  cca3: string;
  name: { common: string; official: string };
  flags: { png: string; alt?: string };
  region: string;
  capital: string[];
  population?: number;
  area: number;
};

export type Country = CountrySummary & {
  subregion: string;
  languages: string[];
  currencies: Array<{ name: string; symbol: string }>;
  timezones: string[];
  borders: string[];
};
