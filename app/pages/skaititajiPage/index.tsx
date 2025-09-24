import Selector from "~/components/Selector";
import styles from "./skaititajiPage.module.css";
import Form from "~/components/Form";
import SignOff from "~/components/SignOff";
import { useState } from "react";
export interface UtilityMeeter {
  id: string;
  adress: string;
  city: string;
  details: {
    action: "Pārbaude" | "Nomaiņa";
    radijums: string;
    iemesls: string;
    novietojums: string;
    atrodas: string;
    kanalizacija: string;
    ipasums: string;
    installed: string[];
    tips: string;
    plombaNr: string;
    marka: string;
    diametrs: string;
    garums: string;
    skaititajaTips: string;
    piezimes: string;
    verifiedDate: Date | null;
  };
}

export interface Signature {
  clientSigniture: string;
  workerSigniture: string;
  worker: string;
  date: Date;
}
const SkaititajiPage = () => {
  const [utilityMeeter, setUtilityMeeter] = useState<UtilityMeeter | null>(
    null
  );
  const [signiture, setSigniture] = useState<Signature | null>(null);

  return (
    <div className={styles.content}>
      <Selector setUtilityMeeter={setUtilityMeeter} />
      {utilityMeeter && (
        <>
          <Form
            utilityMeeter={utilityMeeter}
            setUtilityMeeter={setUtilityMeeter}
          />
          <SignOff setSigniture={setSigniture} />
        </>
      )}
    </div>
  );
};

export default SkaititajiPage;
