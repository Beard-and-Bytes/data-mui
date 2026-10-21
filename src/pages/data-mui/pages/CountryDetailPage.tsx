import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PageContainer } from '../components/common/PageContainer';
import { QueryBoundary } from '../components/common/QueryBoundary';
import { CountryHeader } from '../components/country-detail/CountryHeader';
import { PopulationChart } from '../components/country-detail/PopulationChart';
import { BorderCountriesTable } from '../components/country-detail/BorderCountriesTable';
import { FaIcon } from '../components/common/FaIcon';
import { useCountry } from '../hooks/useCountry';
import { usePopulationHistory } from '../hooks/usePopulationHistory';
import { useBorderCountries } from '../hooks/useBorderCountries';
import { useAllPopulations } from '../hooks/useAllPopulations';
import type { Country } from '../types/country';

type DetailBodyProps = {
  country: Country;
  code: string;
};

const DetailBody = ({ country, code }: DetailBodyProps) => {
  const populationQuery = usePopulationHistory(code);
  const borderQuery = useBorderCountries(country.borders);
  const { data: populations } = useAllPopulations();

  const populationHistory = populationQuery.data;
  const currentPopulation = populationHistory?.[populationHistory.length - 1]?.value;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CountryHeader country={country} population={currentPopulation} />

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Population Over Time
        </Typography>
        <QueryBoundary
          query={populationQuery}
          empty={
            <Typography color="text.secondary">
              No population history available for this country.
            </Typography>
          }
        >
          {(data) => <PopulationChart data={data} />}
        </QueryBoundary>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Bordering Countries
        </Typography>
        {country.borders.length === 0 ? (
          <Typography color="text.secondary">No land borders.</Typography>
        ) : (
          <QueryBoundary query={borderQuery}>
            {(borders) => (
              <BorderCountriesTable
                countries={borders.map((c) => ({ ...c, population: populations?.[c.cca3] }))}
              />
            )}
          </QueryBoundary>
        )}
      </Box>
    </Box>
  );
};

const CountryDetailPage = () => {
  const { code = '' } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const upperCode = code.toUpperCase();

  const countryQuery = useCountry(upperCode);

  return (
    <PageContainer>
      <Button
        startIcon={<FaIcon icon={faArrowLeft} />}
        onClick={() => void navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <QueryBoundary query={countryQuery}>
        {(country) => <DetailBody country={country} code={upperCode} />}
      </QueryBoundary>
    </PageContainer>
  );
};

export default CountryDetailPage;
