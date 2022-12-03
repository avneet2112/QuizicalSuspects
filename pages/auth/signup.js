import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import Loader from '../../components/Loader';
const theme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      id: data.get(router.query?.type == 'student' ? 'studentId' : 'adminId'),
      password: data.get('password'),
      role: router?.query?.type,
    };
    axios
      .post('/api/auth/signup', { data: dataToSend })
      .then((res) => {
        setLoading(false);
        toast(res.data.message);
        res.status === 200 && Router.router.push('/auth/login');
      })
      .catch((err) => {
        setLoading(false);
        console.log('err');
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  placeholder='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  placeholder='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="subject"
                  placeholder="Subject"
                  name="subject"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={router.query?.type == 'student' ? 'studentId' : 'adminId'}
                  placeholder={
                    router?.query?.type == 'student'
                      ? 'StudentId Address'
                      : 'admin email or id'
                  }
                  name={
                    router.query?.type == 'student' ? 'studentId' : 'adminId'
                  }
                  autoComplete={
                    router.query?.type == 'student' ? 'studentId' : 'adminId'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  placeholder='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>

            {loading && (
              <div className='text-center'>
                <Loader />
              </div>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                Already have an account?&nbsp;
                <Link href='/auth/login?type=student' variant='body2'>
                  Student
                </Link>
                &nbsp;/&nbsp;
                <Link href='/auth/login?type=admin' variant='body2'>
                  Admin
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
