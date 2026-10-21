import { useQuery } from '@tanstack/react-query';
import { fetchPopulationHistory } from '../api/worldBankApi';
import { populationKeys } from '../queryKeys';

export const usePopulationHistory = (cca3: string) =>
  useQuery({
    queryKey: populationKeys.byCountry(cca3),
    queryFn: () => fetchPopulationHistory(cca3),
    enabled: !!cca3,
  });
