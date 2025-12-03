import React from "react";
import { Divider, TextField } from "@mui/material";
import type { Details, UtilityMeeter } from "~/pages/utilityMeeterPage";
import MeterSection from "../MeterSection";
import { CHANGE_REASONS } from "..";

interface Props {
  utilityMeeter: UtilityMeeter;
  setUtilityMeeter: (u: UtilityMeeter) => void;
}

const ChangeForm = ({ utilityMeeter, setUtilityMeeter }: Props) => {
  if (!utilityMeeter.oldMeeter) return null;

  const oldMeter = utilityMeeter.oldMeeter;

  const updateOldDetails = <K extends keyof Details>(
    key: K,
    value: Details[K]
  ) => {
    setUtilityMeeter({
      ...utilityMeeter,
      oldMeeter: {
        ...oldMeter,
        details: {
          ...oldMeter.details,
          [key]: value,
        },
      },
    });
  };

  const updateNewDetails = <K extends keyof Details>(
    key: K,
    value: Details[K]
  ) => {
    setUtilityMeeter({
      ...utilityMeeter,
      details: {
        ...utilityMeeter.details,
        [key]: value,
      },
    });
  };

  return (
    <>
      {/* OLD METER */}
      <h2>Vecais skaitītājs (noņemts)</h2>

      <TextField
        label="Skaitītāja ID"
        value={oldMeter.id}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      <MeterSection
        details={oldMeter.details}
        onDetailsChange={updateOldDetails}
        reasonOptions={CHANGE_REASONS}
        showVerifiedTillDate
      />

      <Divider sx={{ my: 4 }} />

      {/* NEW METER */}
      <h2>Jaunais skaitītājs (uzstādīts)</h2>

      <TextField
        label="Skaitītāja ID"
        value={utilityMeeter.id}
        required
        fullWidth
        onChange={(e) =>
          setUtilityMeeter({ ...utilityMeeter, id: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <MeterSection
        details={utilityMeeter.details}
        onDetailsChange={updateNewDetails}
        reasonOptions={CHANGE_REASONS}
        showVerificationDate
      />
    </>
  );
};

export default ChangeForm;
