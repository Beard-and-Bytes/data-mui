import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import type { PopulationPoint } from '../../types/country';
import { formatCompact } from '../../utils/formatters';

type Props = {
  data: PopulationPoint[];
};

export const PopulationChart = ({ data }: Props) => (
  <Box sx={{ width: '100%', height: 320 }}>
    <LineChart
      xAxis={[{ data: data.map((d) => d.year), label: 'Year' }]}
      yAxis={[{ valueFormatter: (value: number) => formatCompact(value) }]}
      series={[{ data: data.map((d) => d.value), label: 'Population', showMark: false }]}
    />
  </Box>
);
