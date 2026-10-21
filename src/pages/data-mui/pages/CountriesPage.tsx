import Typography from '@mui/material/Typography';
import { PageContainer } from '../components/common/PageContainer';
import { QueryBoundary } from '../components/common/QueryBoundary';
import { CountriesTable } from '../components/countries/CountriesTable';
import { useCountries } from '../hooks/useCountries';
import { useAllPopulations } from '../hooks/useAllPopulations';

const CountriesPage = () => {
  const countriesQuery = useCountries();
  const { data: populations } = useAllPopulations();

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Countries
      </Typography>
      <QueryBoundary query={countriesQuery} empty={<Typography>No countries found.</Typography>}>
        {(countries) => (
          <CountriesTable
            rows={
              populations
                ? countries.map((c) => ({ ...c, population: populations[c.cca3] }))
                : countries
            }
          />
        )}
      </QueryBoundary>
    </PageContainer>
  );
};

export default CountriesPage;
