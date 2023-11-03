import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { login } from '../../api';
import { LoginFormData } from '../../types/types';
import { useAppContext } from '../../AppContext';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Login = () => {
  const { setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['yenn_token']);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData: LoginFormData = {
      username: data.get('email') as string,
      password: data.get('password') as string,
    };
    mutate(loginData);
    // Here you should handle the login logic, i.e., send a request to your API
  };

  const { mutate, isLoading: isLoginDone } = useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
      setCookie('yenn_token', data.access_token);
      setIsLoggedIn(true);
      navigate('/');
    },
    onError: (e) => {
      console.log(e);
      alert(e);
    },
    // onSettled: () => {
    //   QueryClient.invalidateQueries('create');
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100%' }}>
        <CssBaseline />

        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
