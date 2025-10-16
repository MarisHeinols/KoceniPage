import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./Form.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";
import { isFormComplete } from "./utils/utils";

interface FormProps {
  utilityMeeter: UtilityMeeter;
  setUtilityMeeter: (newUtilityMeeter: UtilityMeeter) => void;
  setIsFormCompleted: (isFormValid: boolean) => void;
}

const Form = ({
  utilityMeeter,
  setUtilityMeeter,
  setIsFormCompleted,
}: FormProps) => {
  const formData = utilityMeeter.details;

  const updateField = <K extends keyof UtilityMeeter["details"]>(
    field: K,
    value: UtilityMeeter["details"][K]
  ) => {
    setUtilityMeeter({
      ...utilityMeeter,
      details: {
        ...utilityMeeter.details,
        [field]: value,
      },
    });
    if (isFormComplete(formData)) {
      setIsFormCompleted(true);
    }
  };

  const handleInstalledChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedInstalled = checked
      ? [...formData.installed, value]
      : formData.installed.filter((item) => item !== value);
    updateField("installed", updatedInstalled);
  };

  return (
    <div className={styles.formContentContainer}>
      <h2>Skaitītāja nomaiņas/pārbaudes informācija</h2>
      <div className={styles.smallField}>
        <Tabs
          value={formData.action}
          onChange={(_, newValue) => updateField("action", newValue)}
          aria-label="basic tabs example"
        >
          <Tab value="Pārbaude" label="Pārbaude" />
          <Tab value="Nomaiņa" label="Nomaiņa" />
        </Tabs>
      </div>

      <div className={styles.row}>
        {/* LEFT SIDE */}
        <div className={styles.rowEntry}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Radijums"
              variant="outlined"
              type="number"
              required
              fullWidth
              value={formData.radijums}
              onChange={(e) => updateField("radijums", e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Iemesls"
              variant="outlined"
              multiline
              required
              minRows={6}
              fullWidth
              value={formData.iemesls}
              onChange={(e) => updateField("iemesls", e.target.value)}
            />
          </Stack>

          <h2>Detaļas:</h2>

          {/* Novietojums */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Novietojums</FormLabel>
              <RadioGroup
                row
                value={formData.novietojums}
                onChange={(e) => updateField("novietojums", e.target.value)}
              >
                <FormControlLabel
                  value="Horizontāli"
                  control={<Radio />}
                  label="Horizontāli"
                />
                <FormControlLabel
                  value="Vertikāli"
                  control={<Radio />}
                  label="Vertikāli"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {/* Atrodas */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Atrodas</FormLabel>
              <RadioGroup
                row
                value={formData.atrodas}
                onChange={(e) => updateField("atrodas", e.target.value)}
              >
                <FormControlLabel value="Ēka" control={<Radio />} label="Ēka" />
                <FormControlLabel value="Akā" control={<Radio />} label="Akā" />
              </RadioGroup>
            </FormControl>
          </Stack>

          {/* Bez Kanalizācijas */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Bez Kanalizācijas</FormLabel>
              <RadioGroup
                row
                value={formData.kanalizacija}
                onChange={(e) => updateField("kanalizacija", e.target.value)}
              >
                <FormControlLabel
                  value="Apakšskaitājs"
                  control={<Radio />}
                  label="Apakšskaitājs"
                />
                <FormControlLabel
                  value="Neatkarīgais skaitītājs"
                  control={<Radio />}
                  label="Neatkarīgais skaitītājs"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {/* Īpašums */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Skaitītājs ir</FormLabel>
              <RadioGroup
                row
                value={formData.ipasums}
                onChange={(e) => updateField("ipasums", e.target.value)}
              >
                <FormControlLabel
                  value="KKS Īpašums"
                  control={<Radio />}
                  label="KKS Īpašums"
                />
                <FormControlLabel
                  value="Klienta īpašums"
                  control={<Radio />}
                  label="Klienta īpašums"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {/* Uzstādīts */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Uzstādīts</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.installed.includes("Filtrs")}
                      onChange={handleInstalledChange}
                      value="Filtrs"
                    />
                  }
                  label="Filtrs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.installed.includes("Pretvārsts")}
                      onChange={handleInstalledChange}
                      value="Pretvārsts"
                    />
                  }
                  label="Pretvārsts"
                />
              </FormGroup>
            </FormControl>
          </Stack>

          {/* Tips */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl component="fieldset" sx={{ flex: 1 }} required>
              <FormLabel component="legend">Tips</FormLabel>
              <RadioGroup
                row
                value={formData.tips}
                onChange={(e) => updateField("tips", e.target.value)}
              >
                <FormControlLabel
                  value="Komercskaitītājs"
                  control={<Radio />}
                  label="Komercskaitītājs"
                />
                <FormControlLabel
                  value="Neatkarīgais skaitītājs"
                  control={<Radio />}
                  label="Neatkarīgais skaitītājs"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.rowEntry}>
          {/* Other fields like Plomba Nr, Marka, Diametrs, Garums etc. */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Plomba Nr"
              required
              variant="outlined"
              fullWidth
              value={formData.plombaNr}
              onChange={(e) => updateField("plombaNr", e.target.value)}
            />
            <TextField
              label="Marka"
              variant="outlined"
              required
              fullWidth
              value={formData.marka}
              onChange={(e) => updateField("marka", e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Diametrs"
              variant="outlined"
              fullWidth
              type="number"
              required
              value={formData.diametrs}
              onChange={(e) => updateField("diametrs", e.target.value)}
            />
            <TextField
              label="Garums"
              variant="outlined"
              fullWidth
              required
              type="number"
              value={formData.garums}
              onChange={(e) => updateField("garums", e.target.value)}
            />
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <DatePicker
                label="Verificēts/Iegādāts"
                value={formData.verifiedDate}
                onChange={(newValue) => updateField("verifiedDate", newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default Form;
