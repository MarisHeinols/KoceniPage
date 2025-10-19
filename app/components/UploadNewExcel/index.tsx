import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { uploadUtilityMetersFromExcel } from "~/firestore/firestore";
import styles from "./UploadNewExcel.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadNewExcel = () => {
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const result = await uploadUtilityMetersFromExcel(file);

      if (!result) {
        toast.error("⚠️ No result returned from upload function.");
        return;
      }

      if (result.errors?.length) {
        toast.error(
          `⚠️ Completed with ${result.errors[0].message} errors. Added: ${result.added.length}, Skipped: ${result.skipped.length}`
        );
      } else {
        toast.success(
          `✅ Successfully uploaded! Added: ${result.added.length}, Skipped: ${result.skipped.length}`
        );
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error(`❌ Upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadNewExcelContainer}>
      <FormGroup>
        <FormControlLabel
          required
          onChange={() => {
            setConfirmation(!confirmation);
          }}
          control={<Checkbox />}
          label="Vēlos aizvietot ierakstus"
        />
      </FormGroup>
      <Button
        variant="contained"
        component="label"
        disabled={loading || !confirmation}
      >
        {loading ? "Uploading..." : "Upload Excel"}
        <input
          type="file"
          hidden
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </Button>
      {loading && <CircularProgress sx={{ ml: 2 }} />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default UploadNewExcel;
