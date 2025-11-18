import React from "react";
import styles from "./HomePage.module.css";
import AddchartIcon from "@mui/icons-material/Addchart";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router";
import { getUserCredentails, logout } from "~/firestore/firestore";
const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.heroText}>Sveiks {getUserCredentails()} !</h1>
      <div className={styles.selector}>
        <Link to="/utility-meter" className={styles.selectorBoxGreen}>
          <h2 style={{ color: "white" }}>Darbības Ar Skaitītāju</h2>
          <AddchartIcon />
        </Link>

        <Link to="/all-readings" className={styles.selectorBoxBlue}>
          <h2 style={{ color: "white" }}>Visi Ieraksti</h2>
          <BackupTableIcon />
        </Link>
      </div>
      <Link to="/new-utility-meter" className={styles.selectorBoxRed}>
        <h2 style={{ color: "white" }}>Jauns Skaitītājs</h2>
        <AddCircleOutlineIcon />
      </Link>

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
