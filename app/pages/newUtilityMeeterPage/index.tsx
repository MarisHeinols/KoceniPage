import React, { useEffect, useState } from "react";
import Form from "~/components/Form";
import type { UtilityMeeter } from "../utilityMeeterPage";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./NewUtilityMeeterPage.module.css";
import { getAddressMapping } from "~/firestore/firestore";

const NewUtilityMeeterPage = () => {
  const [utilityMeeter, setUtilityMeeter] = useState<UtilityMeeter>({
    id: "",
    adress: "",
    city: "",
    details: {
      action: "Pārbaude",
      radijums: "",
      iemesls: "",
      novietojums: "",
      atrodas: "string",
      installed: [],
      tips: "",
      plombaNr: "",
      marka: "",
      diametrs: "",
      garums: "",
      piezimes: "",
      verifiedTillDate: null,
    },
    signiture: {
      clientSigniture: "",
      workerSigniture: "",
      worker: "",
      date: null,
    },
    client: { clientFullName: "", mobileNr: "" },
  });
  const [formIsCompleted, setIsFormCompleted] = useState(false);
  const [mapping, setMapping] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [loading, setLoading] = useState(true);

  const updateUtilityMeeterValue = <K extends keyof UtilityMeeter>(
    field: K,
    value: UtilityMeeter[K]
  ) => {
    setUtilityMeeter({
      ...utilityMeeter,
      [field]: value,
    });
  };
  const cities = Object.keys(mapping);

  useEffect(() => {
    const fetchMapping = async () => {
      try {
        const data = await getAddressMapping();
        setMapping(data);
      } catch (err) {
        console.error("Error loading address mapping:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMapping();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.formContainer}>
        <div className={styles.formContainerLeft}>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <Grid container spacing={2}>
              <TextField
                label="ID"
                variant="outlined"
                required
                fullWidth
                value={utilityMeeter.id}
                onChange={(e) =>
                  updateUtilityMeeterValue(e.currentTarget.value)
                }
              />

              <TextField
                label="Klienta Vārds Uzvārds"
                variant="outlined"
                required
                fullWidth
                value={utilityMeeter.client.clientFullName}
                onChange={(e) =>
                  updateUtilityMeeterValue(e.currentTarget.value)
                }
              />

              <TextField
                label="Klienta Tel nr"
                variant="outlined"
                required
                fullWidth
                value={utilityMeeter.client.mobileNr}
                onChange={(e) =>
                  updateUtilityMeeterValue(e.currentTarget.value)
                }
              />
            </Grid>
          </FormControl>
        </div>
        <div className={styles.formContainerRight}>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <Grid container spacing={2}>
              {" "}
              <InputLabel id="city">Ciems</InputLabel>
              <Select
                labelId="city"
                value={utilityMeeter.city}
                label="Ciems"
                onChange={(e) => updateUtilityMeeterCity(e.target.value)}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Adrese"
                variant="outlined"
                required
                fullWidth
                value={utilityMeeter.client.mobileNr}
                onChange={(e) => updateUtilityMeeterId(e.currentTarget.value)}
              />
            </Grid>
          </FormControl>
        </div>
      </div>

      <Form
        utilityMeeter={utilityMeeter}
        setUtilityMeeter={setUtilityMeeter}
        setIsFormCompleted={setIsFormCompleted}
        customTitle=" "
      />
    </div>
  );
};

export default NewUtilityMeeterPage;
