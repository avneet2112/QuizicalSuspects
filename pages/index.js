import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import LandingPage from "../components/LandingPage";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <LandingPage styles={styles} />
      <Footer styles={styles} />
    </div>
  );
}
