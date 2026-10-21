import type { GridColDef } from '@mui/x-data-grid'
import type { CountrySummary } from '../../types/country'
import { FlagAvatar } from '../common/FlagAvatar'
import { ViewCountryButton } from './ViewCountryButton'
import { formatNumber, formatArea, firstOrFallback } from '../../utils/formatters'

export const getCountryColumns = (regions: string[]): GridColDef<CountrySummary>[] => [
  {
    field: 'flags',
    headerName: '',
    width: 64,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => <FlagAvatar png={row.flags.png} alt={row.flags.alt} size={36} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1.5,
    minWidth: 160,
    valueGetter: (value: CountrySummary['name']) => value.common,
  },
  {
    field: 'region',
    headerName: 'Region',
    flex: 1,
    minWidth: 100,
    type: 'singleSelect',
    valueOptions: regions,
  },
  {
    field: 'capital',
    headerName: 'Capital',
    flex: 1,
    minWidth: 120,
    sortable: false,
    valueGetter: (value: string[]) => firstOrFallback(value),
  },
  {
    field: 'population',
    headerName: 'Population',
    flex: 1,
    minWidth: 120,
    type: 'number',
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: 'area',
    headerName: 'Area',
    flex: 1,
    minWidth: 120,
    type: 'number',
    valueFormatter: (value: number) => formatArea(value),
  },
  {
    field: 'cca3',
    headerName: '',
    width: 72,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => <ViewCountryButton cca3={row.cca3} />,
  },
]
