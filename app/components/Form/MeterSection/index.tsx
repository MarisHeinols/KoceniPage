import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import type { Details } from "~/pages/utilityMeeterPage";
import styles from "../Form.module.css";
import { veidsOptions } from "..";
import { toJsDate } from "~/firestore/utils/utils";

interface Props {
  details: Details;
  onDetailsChange: <K extends keyof Details>(key: K, value: Details[K]) => void;

  reasonOptions: string[];

  showVerifiedTillDate?: boolean; // read-only
  showVerificationDate?: boolean; // editable
}

const MeterSection = ({
  details,
  onDetailsChange,
  reasonOptions,
  showVerifiedTillDate = false,
  showVerificationDate = false,
}: Props) => {
  const handleInstalledChange = (value: string, checked: boolean) => {
    const updatedInstalled = checked
      ? [...details.installed, value]
      : details.installed.filter((i) => i !== value);

    onDetailsChange("installed", updatedInstalled);
  };

  // ✅ Make sure Select never gets an out-of-range value
  const safeReasonValue = reasonOptions.includes(details.iemesls)
    ? details.iemesls
    : "";

  return (
    <div className={styles.row}>
      {/* LEFT SIDE */}
      <div className={styles.rowEntry}>
        <Stack spacing={2}>
          {/* Rādījums */}
          <TextField
            label="Rādījums"
            type="number"
            required
            fullWidth
            value={details.radijums}
            onChange={(e) => onDetailsChange("radijums", e.target.value)}
          />

          {/* Iemesls — ALWAYS VISIBLE */}
          <FormControl fullWidth required>
            <InputLabel>Iemesls</InputLabel>
            <Select
              label="Iemesls"
              value={safeReasonValue}
              onChange={(e) => onDetailsChange("iemesls", e.target.value)}
            >
              {reasonOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Veids */}
          <FormControl fullWidth required>
            <InputLabel>Veids</InputLabel>
            <Select
              label="Veids"
              value={details.veids || ""}
              onChange={(e) => onDetailsChange("veids", e.target.value)}
            >
              {Object.entries(veidsOptions).map(([code, label]) => (
                <MenuItem key={code} value={code}>
                  {code} – {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Novietojums */}
          <FormControl component="fieldset" required>
            <FormLabel>Novietojums</FormLabel>
            <RadioGroup
              row
              value={details.novietojums}
              onChange={(e) => onDetailsChange("novietojums", e.target.value)}
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

          {/* Atrodas */}
          <FormControl component="fieldset" required>
            <FormLabel>Atrodas</FormLabel>
            <RadioGroup
              row
              value={details.atrodas}
              onChange={(e) => onDetailsChange("atrodas", e.target.value)}
            >
              <FormControlLabel value="Ēkā" control={<Radio />} label="Ēkā" />
              <FormControlLabel value="Akā" control={<Radio />} label="Akā" />
            </RadioGroup>
          </FormControl>

          {/* Uzstādīts */}
          <FormControl component="fieldset" required>
            <FormLabel>Uzstādīts</FormLabel>
            <FormGroup row>
              {["Filtrs", "Pretvārsts"].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={details.installed.includes(item)}
                      onChange={(e) =>
                        handleInstalledChange(item, e.target.checked)
                      }
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Tips */}
          <FormControl component="fieldset" required>
            <FormLabel>Tips</FormLabel>
            <RadioGroup
              row
              value={details.tips}
              onChange={(e) => onDetailsChange("tips", e.target.value)}
            >
              {["Mehāniskais", "Ultraskaņas", "Impulsa", "Magnētiskais"].map(
                (tip) => (
                  <FormControlLabel
                    key={tip}
                    value={tip}
                    control={<Radio />}
                    label={tip}
                  />
                )
              )}
            </RadioGroup>
          </FormControl>
        </Stack>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rowEntry}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Plomba Nr"
              required
              fullWidth
              value={details.plombaNr}
              onChange={(e) => onDetailsChange("plombaNr", e.target.value)}
            />
            <TextField
              label="Marka"
              required
              fullWidth
              value={details.marka}
              onChange={(e) => onDetailsChange("marka", e.target.value)}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Diametrs"
              type="number"
              required
              fullWidth
              value={details.diametrs}
              onChange={(e) => onDetailsChange("diametrs", e.target.value)}
            />
            <TextField
              label="Garums"
              type="number"
              required
              fullWidth
              value={details.garums}
              onChange={(e) => onDetailsChange("garums", e.target.value)}
            />
          </Stack>

          {/* VERIFIED TILL — READ ONLY */}
          {showVerifiedTillDate && !showVerificationDate && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Verificēts līdz"
                value={toJsDate(details.verifiedTillDate)}
                disabled={Boolean(details.verifiedTillDate)}
                onChange={(date) => onDetailsChange("verifiedTillDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          )}

          {/* VERIFICATION DATE — EDITABLE */}
          {showVerificationDate && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Verifikācijas datums"
                value={details.verifiedOnDate}
                onChange={(date) => onDetailsChange("verifiedOnDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          )}

          {/* Notes */}
          <TextField
            label="Piezīmes"
            multiline
            minRows={5}
            fullWidth
            value={details.piezimes}
            onChange={(e) => onDetailsChange("piezimes", e.target.value)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default MeterSection;
