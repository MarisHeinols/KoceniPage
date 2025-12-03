import React, { useEffect } from "react";
import type { Details, UtilityMeeter } from "~/pages/utilityMeeterPage";
import MeterSection from "../MeterSection";
import { CHECK_REASONS } from "..";

interface CheckFormProps {
  formData: Details;
  updateDetailsField: <K extends keyof UtilityMeeter["details"]>(
    key: K,
    value: UtilityMeeter["details"][K]
  ) => void;
}

const CheckForm = ({ formData, updateDetailsField }: CheckFormProps) => {
  useEffect(() => {
    if (!formData.iemesls || !CHECK_REASONS.includes(formData.iemesls)) {
      updateDetailsField("iemesls", CHECK_REASONS[0]);
    }
  }, []);

  return (
    <MeterSection
      details={formData}
      onDetailsChange={updateDetailsField}
      reasonOptions={CHECK_REASONS}
      showVerifiedTillDate
    />
  );
};

export default CheckForm;
