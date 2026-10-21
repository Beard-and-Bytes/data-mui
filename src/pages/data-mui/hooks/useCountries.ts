import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../api/countriesApi';
import { countryKeys } from '../queryKeys';

export const useCountries = () =>
  useQuery({
    queryKey: countryKeys.list(),
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60,
  });
