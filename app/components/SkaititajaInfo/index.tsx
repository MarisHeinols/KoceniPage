import React, { useState } from "react";
import styles from "./SkaititajuInfo.module.css";
const SkaititajaInfo = () => {
  const [skaititajs, setSkaititajs] = useState({
    id: "",
    measurment: null,
    date: "",
    plombNr: "",
    verificationDate: "",
  });
  return (
    <div className={styles.infoContainer}>
      {skaititajs.id ? (
        <>
          <h2 className={styles.infoContainerHeader}>{skaititajs.id}</h2>
          <div className={styles.infoEntry}>
            <h2>Radijums:</h2> <h2>{skaititajs.measurment}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Datums:</h2> <h2>{skaititajs.date}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Plombes Nr:</h2> <h2>{skaititajs.plombNr}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Verifikācijas Datums:</h2>{" "}
            <h2>{skaititajs.verificationDate}</h2>
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.infoContainerHeaderWarning}>
            Nav Izvēlēts skaitītājs
          </h2>
        </>
      )}
    </div>
  );
};

export default SkaititajaInfo;
