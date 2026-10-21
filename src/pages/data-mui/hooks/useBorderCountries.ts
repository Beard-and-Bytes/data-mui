import { useQuery } from '@tanstack/react-query';
import { fetchCountriesByCodes } from '../api/countriesApi';
import { countryKeys } from '../queryKeys';

export const useBorderCountries = (codes: string[]) =>
  useQuery({
    queryKey: countryKeys.borders(codes),
    queryFn: () => fetchCountriesByCodes(codes),
    enabled: codes.length > 0,
  });
