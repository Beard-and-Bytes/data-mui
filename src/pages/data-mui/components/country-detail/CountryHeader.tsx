import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Country } from '../../types/country';
import { FlagAvatar } from '../common/FlagAvatar';
import { StatItem } from '../common/StatItem';
import { formatNumber, formatArea, joinValues, firstOrFallback } from '../../utils/formatters';

type Props = {
  country: Country;
  population?: number;
};

export const CountryHeader = ({ country, population }: Props) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <FlagAvatar png={country.flags.png} alt={country.flags.alt} size={80} />
      <Box>
        <Typography variant="h4" component="h1">
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {country.name.official}
        </Typography>
      </Box>
    </Box>

    <Grid container spacing={2}>
      {(
        [
          ['Region', country.region],
          ['Subregion', country.subregion || '—'],
          ['Capital', firstOrFallback(country.capital)],
          ['Population', formatNumber(population ?? country.population)],
          ['Area', formatArea(country.area)],
          ['Languages', joinValues(country.languages)],
          [
            'Currencies',
            joinValues(country.currencies.map((c) => `${c.name} (${c.symbol})`)),
          ],
          ['Timezones', joinValues(country.timezones)],
        ] as const
      ).map(([label, value]) => (
        <Grid key={label} size={{ xs: 6, sm: 4, md: 3 }}>
          <StatItem label={label} value={value} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
