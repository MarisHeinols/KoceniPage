import React, { useEffect, useState } from "react";
import styles from "./Selector.module.css";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";
import UtilityMeeterInfo from "../UtilityMeeterInfo";
import { getAddressMapping, getUtilityMeeterById } from "~/firestore/firestore";

interface SelectorProps {
  setUtilityMeeter: (fetchedUtilityMeeter: UtilityMeeter | null) => void;
  utilityMeeter: UtilityMeeter | null;
}
const Selector = ({ setUtilityMeeter, utilityMeeter }: SelectorProps) => {
  const [mapping, setMapping] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedMeter, setSelectedMeter] = useState<string>("");

  // Fetch address mapping on load
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

  // Derived lists
  const cities = Object.keys(mapping).sort();
  const addresses = selectedCity
    ? Object.keys(mapping[selectedCity] || {}).sort()
    : [];
  const meters =
    selectedCity && selectedAddress
      ? mapping[selectedCity][selectedAddress].sort() || []
      : [];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedAddress("");
    setSelectedMeter("");
    setUtilityMeeter(null);
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setSelectedMeter("");
    setUtilityMeeter(null);
  };

  const handleMeterSelect = async (meterId: string) => {
    setSelectedMeter(meterId);
    const meterData = await getUtilityMeeterById(meterId);
    if (meterData) {
      setUtilityMeeter({
        ...meterData,
        details: {
          ...meterData.details,
          action: "Pārbaude",
        },
        oldMeeter: undefined,
        checkDetails: undefined,
      });
    }
  };

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selectorHalfLeft}>
        {/* City */}
        <FormControl sx={{ width: "100%", mb: 2 }}>
          <InputLabel id="city">Ciems</InputLabel>
          <Select
            labelId="city"
            value={selectedCity}
            label="Ciems"
            onChange={(e) => handleCitySelect(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Address */}
        <FormControl sx={{ width: "100%", mb: 2 }} disabled={!selectedCity}>
          <InputLabel id="address">Adrese</InputLabel>
          <Select
            labelId="address"
            value={selectedAddress}
            label="Adrese"
            onChange={(e) => handleAddressSelect(e.target.value)}
          >
            {addresses.map((address) => (
              <MenuItem key={address} value={address}>
                {address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Meter */}
        <FormControl sx={{ width: "100%", mb: 2 }} disabled={!selectedAddress}>
          <InputLabel id="meter">Skaitītājs</InputLabel>
          <Select
            labelId="meter"
            value={selectedMeter}
            label="Skaitītājs"
            onChange={(e) => handleMeterSelect(e.target.value)}
          >
            {meters.map((meterId) => (
              <MenuItem key={meterId} value={meterId}>
                {meterId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.selectorHalfRight}>
        <UtilityMeeterInfo utilityMeeter={utilityMeeter} />
      </div>
    </div>
  );
};

export default Selector;
