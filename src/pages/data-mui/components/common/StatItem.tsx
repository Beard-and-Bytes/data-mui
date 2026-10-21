import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  label: string;
  value: string;
};

export const StatItem = ({ label, value }: Props) => (
  <Box>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} gutterBottom>
      {label}
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);
