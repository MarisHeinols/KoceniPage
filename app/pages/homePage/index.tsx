import React from "react";
import styles from "./HomePage.module.css";
import AddchartIcon from "@mui/icons-material/Addchart";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { Link } from "react-router";
import { getUserCredentails, logout } from "~/firestore/firestore";
const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.heroText}>Sveiks {getUserCredentails()} !</h1>
      <div className={styles.selector}>
        <Link to="/utility-meter" className={styles.selectorBoxGreen}>
          <h2 style={{ color: "white" }}>Jauns Rādījums</h2>
          <AddchartIcon />
        </Link>

        <Link to="/all-readings" className={styles.selectorBoxBlue}>
          <h2 style={{ color: "white" }}>Visi Rādījumi</h2>
          <BackupTableIcon />
        </Link>
      </div>
      <div
        className={styles.logOutButton}
        onClick={() => {
          logout();
        }}
      >
        <h2 style={{ color: "white" }}>Izrakstīties</h2>
      </div>
    </div>
  );
};

export default HomePage;
