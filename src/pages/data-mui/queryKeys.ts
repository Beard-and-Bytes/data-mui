export const countryKeys = {
  all: ['countries'] as const,
  list: () => [...countryKeys.all, 'list'] as const,
  detail: (code: string) => [...countryKeys.all, 'detail', code] as const,
  borders: (codes: string[]) => [...countryKeys.all, 'borders', codes.join(',')] as const,
};

export const populationKeys = {
  all: ['population'] as const,
  allCountries: () => [...populationKeys.all, 'all-countries'] as const,
  byCountry: (code: string) => [...populationKeys.all, code] as const,
};
