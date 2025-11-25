import React from "react";
import styles from "./UtilityMeeterInfo.module.css";
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";
interface UtilityMeeterInfoProps {
  utilityMeeter: UtilityMeeter | null;
}
const UtilityMeeterInfo = ({ utilityMeeter }: UtilityMeeterInfoProps) => {
  return (
    <div className={styles.infoContainer}>
      {utilityMeeter ? (
        <>
          <h2 className={styles.infoContainerHeader}>{utilityMeeter.id}</h2>
          <div className={styles.infoEntry}>
            <h2>Radijums:</h2> <h2>{utilityMeeter.details.radijums}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Datums:</h2>{" "}
            <h2>{utilityMeeter.signiture.date?.toDateString()}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Plomba Nr:</h2> <h2>{utilityMeeter.details.plombaNr}</h2>
          </div>
          <div className={styles.infoEntry}>
            <h2>Verificēts līdz:</h2>
            <h2>{utilityMeeter.details.verifiedTillDate?.toDateString()}</h2>
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.infoContainerHeaderWarning}>
            Nav Izvēlēts Skaitītājs
          </h2>
        </>
      )}
    </div>
  );
};

export default UtilityMeeterInfo;
