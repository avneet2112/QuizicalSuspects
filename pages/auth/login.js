import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
const theme = createTheme();

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      id: data.get('id'),
      password: data.get('password'),
    };
    axios
      .get(
        `/api/auth/login?id=${dataToSend.id}&password=${dataToSend.password}`
      )
      .then((res) => {
        setLoading(false);
        toast(res.data.message);
        if (res.status == 200) {
          setError('');
          localStorage.setItem(
            'userDetails',
            JSON.stringify(res.data.userData)
          );
          Router.router.push(`/panel/${res.data.userData.role}`);
        } else {
          setError(res.data.message);
          // Router.router.push('')
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, 'err');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://img.freepik.com/free-vector/quiz-word-concept_23-2147844150.jpg?w=740&t=st=1667927809~exp=1667928409~hmac=965e24abbe7b9e532aa953a8006146acf2375e38d407ac3be2b1158d43fcea71)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='id'
                placeholder={
                  router.query?.type == 'student'
                    ? 'Student Id'
                    : 'Admin Email or Id'
                }
                name='id'
                autoComplete='id'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                placeholder='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {loading && (
                <div className='text-center'>
                  <Loader />
                </div>
              )}
              {error && <label className='text-danger'>{error}</label>}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container className={styles.alignRight}>
                <Grid>
                  Need an account?&nbsp;
                  <Link href='/auth/signup?type=student' variant='body2'>
                    Student
                  </Link>
                  &nbsp;/ &nbsp;
                  <Link href='/auth/signup?type=admin' variant='body2'>
                    Admin
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
