import Link from "next/link";
import React from "react";

const LandingPage = (props) => {
  const { styles } = props;
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Quizical Suspects</a>
        </h1>

        <p className={styles.description}>
          Login with <code className={styles.code}>Student/Admin</code> or{" "}
          <Link href="/auth/signup?student" className={styles.signupB}>
            Sign up
          </Link>
        </p>

        <div className={styles.grid}>
          <a href="/auth/login?student" className={styles.card}>
            <h2>Student</h2>
            <p>Login as student and start your quiz.</p>
          </a>

          <a href="/auth/login?admin" className={styles.card}>
            <h2>Admin</h2>
            <p>Login as admin to create quiz</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
