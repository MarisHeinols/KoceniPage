import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Form = () => {
  const [action, setAction] = useState("Pārbaude");
  const [meterType, setMeterType] = useState("Mehāniskais");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setAction(newValue);
  };
  const handleMeterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeterType(event.target.value);
  };
  return (
    <div>
      <div>
        <Tabs
          value={action}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab value={"Pārbaude"} label="Pārbaude" />
          <Tab value={"Nomaiņa"} label="Nomaiņa" />
        </Tabs>
      </div>

      <TextField id="outlined-basic" label="Radijums" variant="outlined" />
      <TextField id="outlined-basic" label="Iemesls" variant="outlined" />
      <TextField id="outlined-basic" label="Plomba Nr" variant="outlined" />
      <TextField id="outlined-basic" label="Marka" variant="outlined" />
      <TextField id="outlined-basic" label="Diametrs" variant="outlined" />
      <TextField id="outlined-basic" label="Garums" variant="outlined" />
      <FormControl component="fieldset">
        <FormLabel component="legend">Skaitītāja tips</FormLabel>
        <RadioGroup
          row
          value={meterType}
          onChange={handleMeterChange}
          name="meterType"
        >
          <FormControlLabel
            value="Mehāniskais"
            control={<Radio />}
            label="Mehāniskais"
          />
          <FormControlLabel
            value="Impulsa"
            control={<Radio />}
            label="Impulsa"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Form;
