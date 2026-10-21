import { useQuery } from '@tanstack/react-query';
import { fetchCountry } from '../api/countriesApi';
import { countryKeys } from '../queryKeys';

export const useCountry = (cca3: string) =>
  useQuery({
    queryKey: countryKeys.detail(cca3),
    queryFn: () => fetchCountry(cca3),
    enabled: !!cca3,
  });
