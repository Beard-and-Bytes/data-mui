import { useQuery } from '@tanstack/react-query';
import { fetchAllPopulations } from '../api/worldBankApi';
import { populationKeys } from '../queryKeys';

export const useAllPopulations = () =>
  useQuery({
    queryKey: populationKeys.allCountries(),
    queryFn: fetchAllPopulations,
    staleTime: 1000 * 60 * 60,
  });
