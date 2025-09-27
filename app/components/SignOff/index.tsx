import React, { useEffect, useState } from "react";
import styles from "./SignOff.module.css";
import { Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Signature } from "~/pages/utilityMeeterPage";
interface SignOffProps {
  setSigniture: (signature: Signature) => void;
}
const SignOff = ({ setSigniture }: SignOffProps) => {
  const [clientSigniture, setClientSigniture] = useState<string | null>(null);
  const [workerSigniture, setWorkerSigniture] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (clientSigniture && workerSigniture && workerName && selectedDate) {
      setSigniture({
        clientSigniture: clientSigniture,
        workerSigniture: workerSigniture,
        worker: workerName,
        date: selectedDate,
      });
    }
  }, [selectedDate, workerName, workerSigniture, clientSigniture]);

  return (
    <div className={styles.signOffContainer}>
      <h2>Apstiprinājums</h2>
      <div className={styles.signOffEntry}>
        <h2>Apstiprinu (Klients):</h2>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Paraksts"
            variant="outlined"
            required
            value={clientSigniture}
            onChange={(e) => {
              setClientSigniture(e.currentTarget.value);
            }}
          />
        </Stack>
      </div>
      <div className={styles.signOffEntry}>
        <h2>Darbinieks: Vards Uzvards / </h2>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Paraksts"
            variant="outlined"
            required
            value={workerSigniture}
            onChange={(e) => {
              setWorkerSigniture(e.currentTarget.value);
              setWorkerName(e.currentTarget.value);
            }}
          />
        </Stack>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <DatePicker
            label="Datums"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default SignOff;
