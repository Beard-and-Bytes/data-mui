import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BASE_PATH } from '../routes';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1">
        404
      </Typography>
      <Typography color="text.secondary">Page not found.</Typography>
      <Button variant="outlined" onClick={() => void navigate(BASE_PATH)}>
        Back to Countries
      </Button>
    </Box>
  );
};

export default NotFoundPage;
