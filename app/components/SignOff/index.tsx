import React, { useEffect, useRef, useState } from "react";
import styles from "./SignOff.module.css";
import { Stack, Button } from "@mui/material";
import type { Signature } from "~/pages/utilityMeeterPage";
import { getUserCredentails } from "~/firestore/firestore";
import SignatureCanvas from "react-signature-canvas";

interface SignOffProps {
  setSigniture: (signature: Signature) => void;
}

const SignOff = ({ setSigniture }: SignOffProps) => {
  const [workerName, setWorkerName] = useState<string | null>(null);
  const clientSigRef = useRef<SignatureCanvas>(null);
  const workerSigRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    if (!workerName) {
      const respons = getUserCredentails();
      if (respons) setWorkerName(respons);
    }
  }, []);

  const handleSave = () => {
    const clientSigniture = clientSigRef.current?.isEmpty()
      ? null
      : clientSigRef.current?.getCanvas().toDataURL("image/png"); // use getCanvas()

    const workerSigniture = workerSigRef.current?.isEmpty()
      ? null
      : workerSigRef.current?.getCanvas().toDataURL("image/png");

    if (clientSigniture && workerSigniture && workerName) {
      setSigniture({
        clientSigniture,
        workerSigniture,
        worker: workerName,
        date: new Date(),
      });
    }
  };

  const clearClient = () => clientSigRef.current?.clear();
  const clearWorker = () => workerSigRef.current?.clear();

  return (
    <div className={styles.signOffContainer}>
      <h2 className={styles.headings}>Apstiprinājums</h2>

      <div className={styles.signOffEntry}>
        <h3>Apstiprinu (Klients):</h3>
        <SignatureCanvas
          ref={clientSigRef}
          backgroundColor="white"
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: styles.sigCanvas }}
        />
        <Button variant="outlined" onClick={clearClient} sx={{ mt: 1 }}>
          Notīrīt
        </Button>
      </div>

      <div className={styles.signOffEntry}>
        <h3>Darbinieks: {workerName}</h3>
        <SignatureCanvas
          ref={workerSigRef}
          backgroundColor="white"
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: styles.sigCanvas }}
        />
        <Button variant="outlined" onClick={clearWorker} sx={{ mt: 1 }}>
          Notīrīt
        </Button>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Saglabāt parakstu
      </Button>
    </div>
  );
};

export default SignOff;
