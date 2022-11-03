import Image from "next/image";
import React from "react";

const Footer = (props) => {
  const { styles } = props;
  return (
    <>
      <footer className={styles.footer}>
        <a>
          Designed by <span className={styles.logo}>Fleming</span>
        </a>
      </footer>
    </>
  );
};

export default Footer;
