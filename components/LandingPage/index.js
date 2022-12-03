import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const LandingPage = (props) => {
  const { styles } = props;
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='#'>Quizical Suspects</a>
        </h1>

        <p className={styles.description}>
          Login/Register with <code className={styles.code}>Student/Admin</code>
        </p>
        <Grid container spacing={2} justifyContent='center'>
          <Card className={styles.card}>
            <h2>Login</h2>
            <p>We give you two options to login</p>
            <div className='text-center'>
              <Link href={'/auth/login?type=student'} className='text-success'>
                Student
              </Link>
              &nbsp;/&nbsp;
              <Link href={'/auth/login?type=admin'} className='text-success'>
                Admin
              </Link>
            </div>
          </Card>
          <Card className={styles.card}>
            <h2>Signup</h2>
            <p>We give you two options to Signup</p>
            <div className='text-center'>
              <Link href={'/auth/signup?type=student'} className='text-success'>
                Student
              </Link>
              &nbsp;/&nbsp;
              <Link href={'/auth/signup?type=admin'} className='text-success'>
                Admin
              </Link>
            </div>
          </Card>
        </Grid>
      </main>
    </>
  );
};

export default LandingPage;
