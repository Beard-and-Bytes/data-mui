import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type Props<T> = {
  query: UseQueryResult<T, Error>;
  empty?: ReactNode;
  children: (data: T) => ReactNode;
};

export const QueryBoundary = <T,>({ query, empty, children }: Props<T>) => {
  if (query.isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (query.isError) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
        <Typography color="error">
          {query.error instanceof Error ? query.error.message : 'Failed to load data.'}
        </Typography>
        <Button variant="outlined" onClick={() => void query.refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  const data = query.data;

  if (data === undefined || (Array.isArray(data) && data.length === 0)) {
    return <>{empty ?? null}</>;
  }

  return <>{children(data)}</>;
};
