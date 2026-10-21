import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import type { CountrySummary } from '../../types/country';
import { getCountryColumns } from './countryColumns';

type Props = { rows: CountrySummary[] };

export const CountriesTable = ({ rows }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const regions = useMemo(
    () => [...new Set(rows.map((r) => r.region).filter(Boolean))].sort(),
    [rows],
  );

  const columns = useMemo(() => getCountryColumns(regions), [regions]);

  const columnVisibilityModel = useMemo(() => ({
    region: !isMobile,
    capital: !isMobile && !isTablet,
    population: !isMobile,
    area: !isMobile && !isTablet,
  }), [isMobile, isTablet]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.cca3}
      showToolbar
      columnVisibilityModel={columnVisibilityModel}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
      pageSizeOptions={[10, 25, 50]}
      slotProps={{ toolbar: { showQuickFilter: true } }}
      disableRowSelectionOnClick
      autoHeight
      sx={{
        '& .MuiDataGrid-cell': {
          display: 'flex',
          alignItems: 'center',
        },
      }}
    />
  );
};
