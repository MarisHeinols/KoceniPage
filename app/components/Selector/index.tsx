import React, { useState } from "react";
import styles from "./Selector.module.css";
import SkaititajaInfo from "../SkaititajaInfo";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { UtilityMeeter } from "~/pages/skaititajiPage";
export const mockUtilityMeeter: UtilityMeeter = {
  id: "CH123456",
  adress: "Pirma iela 37",
  city: "Koceni",
  details: {
    action: "Pārbaude",
    radijums: "5",
    iemesls: "Regulāra pārbaude",
    novietojums: "Horizontāli",
    atrodas: "Ēka",
    kanalizacija: "Neatkarīgais skaitītājs",
    ipasums: "KKS Īpašums",
    installed: ["Filtrs", "Pretvārsts"],
    tips: "Komercskaitītājs",
    plombaNr: "PL12345",
    marka: "MarkaX",
    diametrs: "15",
    garums: "20",
    skaititajaTips: "Mehāniskais",
    piezimes: "Viss kārtībā",
    verifiedDate: new Date("2025-01-15"),
  },
};
interface SelectorProps {
  setUtilityMeeter: (fetchedUtilityMeeter: UtilityMeeter) => void;
}
const Selector = ({ setUtilityMeeter }: SelectorProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedAdress, setSelectedAdress] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const handleSelectedCity = (city: string | null) => {
    setSelectedCity(city);
  };
  const handleSelectedAdress = (adress: string | null) => {
    setSelectedAdress(adress);
  };
  const handleSelectedCompoent = (component: string | null) => {
    setSelectedComponent(component);
    setUtilityMeeter(mockUtilityMeeter);
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selectorHalf}>
        <FormControl>
          <InputLabel id="Ciems">Ciems</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="Ciems"
            id="ciems"
            value={selectedCity}
            label="Ciems"
            onChange={(e) => {
              handleSelectedCity(e.target.value);
            }}
          >
            <MenuItem value={"Koceni"}>Koceni</MenuItem>
            <MenuItem value={"Vaidava"}>Vaidava</MenuItem>
            <MenuItem value={"Berzaine"}>Berzaine</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="Adresse">Adresse</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="Adresse"
            id="adresse"
            value={selectedAdress}
            label="Adresse"
            onChange={(e) => {
              handleSelectedAdress(e.target.value);
            }}
          >
            <MenuItem value={"Pirma iela 37"}>Pirma iela 37</MenuItem>
            <MenuItem value={"Burtnieku iela"}>Burtnieku iela</MenuItem>
            <MenuItem value={"Cuku iela"}>Cuku iela</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="Skaititajs">Skaititajs</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="Skaititajs"
            id="skaititajs"
            value={selectedComponent}
            label="Skaititajs"
            onChange={(e) => {
              handleSelectedCompoent(e.target.value);
            }}
          >
            <MenuItem value={"CH1213"}>CH1213</MenuItem>
            <MenuItem value={"CH185812"}>CH185812</MenuItem>
            <MenuItem value={"CH12387128937"}>CH12387128937</MenuItem>
          </Select>
        </FormControl>
      </div>
      <SkaititajaInfo />
    </div>
  );
};

export default Selector;
