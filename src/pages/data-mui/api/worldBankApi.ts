import { getJson } from './httpClient';
import type { PopulationPoint } from '../types/country';

const BASE = '/worldbank';

type WorldBankRow = {
  date: string;
  value: number | null;
};

type WorldBankCountryRow = WorldBankRow & {
  countryiso3code: string;
};

export const fetchAllPopulations = async (): Promise<Record<string, number>> => {
  const [, rows] = await getJson<[unknown, WorldBankCountryRow[] | null]>(
    `${BASE}/country/all/indicator/SP.POP.TOTL?format=json&per_page=300&mrv=1`,
  );
  if (!rows) return {};
  return Object.fromEntries(
    rows
      .filter((r): r is WorldBankCountryRow & { value: number } => r.value !== null && r.countryiso3code !== '')
      .map((r) => [r.countryiso3code, r.value]),
  );
};

export const fetchPopulationHistory = async (cca3: string): Promise<PopulationPoint[]> => {
  const [, rows] = await getJson<[unknown, WorldBankRow[] | null]>(
    `${BASE}/country/${cca3}/indicator/SP.POP.TOTL?format=json&per_page=100`,
  );
  if (!rows) return [];
  return rows
    .filter((r): r is { date: string; value: number } => r.value !== null)
    .map((r) => ({ year: Number(r.date), value: r.value }))
    .sort((a, b) => a.year - b.year);
};
