import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = () => (
  <Box
    sx={{ backgroundColor: '#bcb3e1' }}
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='100svh'
  >
    <CircularProgress />
  </Box>
);
