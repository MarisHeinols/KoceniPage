import { Tab, Tabs } from "@mui/material";
import React from "react";
import styles from "./Form.module.css";
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";
import { isFormComplete } from "./utils/utils";
import CheckForm from "./CheckForm";
import ChangeForm from "./ChangeForm";

export const veidsOptions = {
  k41: "ūdens bez kanalizācijas",
  k23: "ūdens bez kanalizācijas (dārza ūdens)",
  k23i: "ūdens bez kanalizācijas (dārza ūdens) (aiz kontrolskaitītāja)",
  k24: "ūdens bez kanalizācijas (pirms kontrolskaitītāja)",
  k43: "ūdens un kanalizācija",
  k45: "kanalizācija bez ūdens",
  k215: "ūdens un kanalizācija (kontrolskaitītājs daudzdzīvokļu mājās)",
  k216_karsts: "karstais ūdens (kontrolskaitītājs daudzdzīvokļu mājās)",
  KKSO: "skaitītāji uzņēmuma objektos",
} as const;

interface FormProps {
  utilityMeeter: UtilityMeeter;
  setUtilityMeeter: (newUtilityMeeter: UtilityMeeter) => void;
  setIsFormCompleted: (isFormValid: boolean) => void;
  customTitle?: string;
}

const Form = ({
  utilityMeeter,
  setUtilityMeeter,
  setIsFormCompleted,
  customTitle,
}: FormProps) => {
  const formData = utilityMeeter.details;
  const updateField = <K extends keyof UtilityMeeter["details"]>(
    field: K,
    value: UtilityMeeter["details"][K]
  ) => {
    const updatedDetails = {
      ...utilityMeeter.details,
      [field]: value,
    };

    setUtilityMeeter({
      ...utilityMeeter,
      details: updatedDetails,
    });

    setIsFormCompleted(isFormComplete(updatedDetails));
  };

  return (
    <div className={styles.formContentContainer}>
      <h2 className={styles.headings}>
        {customTitle
          ? customTitle
          : "Skaitītāja nomaiņas/pārbaudes informācija"}
      </h2>
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
      {utilityMeeter.details.action == "Pārbaude" ? (
        <CheckForm formData={formData} updateField={updateField} />
      ) : (
        <ChangeForm formData={formData} updateField={updateField} />
      )}
    </div>
  );
};

export default Form;
