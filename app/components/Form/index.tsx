import { Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Form.module.css";
import type { Details, UtilityMeeter } from "~/pages/utilityMeeterPage";
import { isFormComplete } from "./utils/utils";
import CheckForm from "./CheckForm";
import ChangeForm from "./ChangeForm";

/* -------------------- CONSTANTS -------------------- */

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

export const CHECK_REASONS = ["Ārpus kārtas pārbaude", "Cits"];
export const CHANGE_REASONS = ["Verifikācijas termiņa beigas", "Cits"];

/* -------------------- PROPS -------------------- */

interface FormProps {
  utilityMeeter: UtilityMeeter;
  setUtilityMeeter: (newUtilityMeeter: UtilityMeeter) => void;
  setIsFormCompleted: (isFormValid: boolean) => void;
  customTitle?: string;
}

/* -------------------- COMPONENT -------------------- */

const Form = ({
  utilityMeeter,
  setUtilityMeeter,
  setIsFormCompleted,
  customTitle,
}: FormProps) => {
  const formData = utilityMeeter.details;

  const updateDetailsField = <K extends keyof UtilityMeeter["details"]>(
    field: K,
    value: UtilityMeeter["details"][K]
  ) => {
    const updatedDetails: Details = {
      ...utilityMeeter.details,
      [field]: value,
    };

    setUtilityMeeter({
      ...utilityMeeter,
      details: updatedDetails,
    });

    setIsFormCompleted(isFormComplete(updatedDetails));
  };

  // Initialize Nomaiņa ONLY ONCE when action first becomes "Nomaiņa"
  useEffect(() => {
    if (utilityMeeter.details.action !== "Nomaiņa") return;
    if (utilityMeeter.oldMeeter) return; // already initialized

    const blankDetails: Details = {
      action: "Nomaiņa",
      radijums: "",
      iemesls: CHANGE_REASONS[0],
      novietojums: "",
      atrodas: "",
      installed: [],
      tips: "",
      plombaNr: "",
      marka: "",
      diametrs: "",
      garums: "",
      piezimes: "",
      verifiedTillDate: null,
      verifiedOnDate: null,
      veids: "",
    };

    setUtilityMeeter({
      ...utilityMeeter,

      // snapshot current "check mode" details
      checkDetails: utilityMeeter.details,

      // snapshot current meter as old meter
      oldMeeter: {
        id: utilityMeeter.id,
        details: utilityMeeter.details,
      },

      // new meter details (blank)
      id: "",
      details: blankDetails,
    });
  }, [utilityMeeter.details.action]);

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
          onChange={(_, newValue) => {
            if (newValue === "Pārbaude") {
              // restore previous check details if we have them
              if (utilityMeeter.checkDetails) {
                const restoredDetails: Details = {
                  ...utilityMeeter.checkDetails,
                  action: "Pārbaude",
                };

                setUtilityMeeter({
                  ...utilityMeeter,
                  details: restoredDetails,
                });

                setIsFormCompleted(isFormComplete(restoredDetails));
              } else {
                updateDetailsField("action", "Pārbaude");
              }
            } else {
              // switch to "Nomaiņa" - initialization useEffect will handle details
              updateDetailsField("action", "Nomaiņa");
            }
          }}
        >
          <Tab value="Pārbaude" label="Pārbaude" />
          <Tab value="Nomaiņa" label="Nomaiņa" />
        </Tabs>
      </div>

      {utilityMeeter.details.action === "Pārbaude" ? (
        <CheckForm
          formData={formData}
          updateDetailsField={updateDetailsField}
        />
      ) : (
        <ChangeForm
          utilityMeeter={utilityMeeter}
          setUtilityMeeter={setUtilityMeeter}
        />
      )}
    </div>
  );
};

export default Form;
