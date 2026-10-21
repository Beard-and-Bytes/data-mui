import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

type Props = {
  children: ReactNode;
};

export const PageContainer = ({ children }: Props) => (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    {children}
  </Container>
);
