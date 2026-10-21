import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { CountrySummary } from '../../types/country';
import { FlagAvatar } from '../common/FlagAvatar';
import { ViewCountryButton } from '../countries/ViewCountryButton';
import { formatNumber, formatArea } from '../../utils/formatters';

type Props = {
  countries: CountrySummary[];
};

const hiddenOnMobile = { display: { xs: 'none', sm: 'table-cell' } };

export const BorderCountriesTable = ({ countries }: Props) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 48 }} />
        <TableCell>Name</TableCell>
        <TableCell align="right" sx={hiddenOnMobile}>Population</TableCell>
        <TableCell align="right" sx={hiddenOnMobile}>Area</TableCell>
        <TableCell sx={{ width: 56 }} />
      </TableRow>
    </TableHead>
    <TableBody>
      {countries.map((c) => (
        <TableRow key={c.cca3} hover>
          <TableCell>
            <FlagAvatar png={c.flags.png} alt={c.flags.alt} size={28} />
          </TableCell>
          <TableCell>{c.name.common}</TableCell>
          <TableCell align="right" sx={hiddenOnMobile}>{formatNumber(c.population)}</TableCell>
          <TableCell align="right" sx={hiddenOnMobile}>{formatArea(c.area)}</TableCell>
          <TableCell align="right">
            <ViewCountryButton cca3={c.cca3} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
