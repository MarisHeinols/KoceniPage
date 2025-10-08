import React, { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { uploadUtilityMetersFromExcel } from "~/firestore/firestore";

const AllReadingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");
    setError("");
    try {
      const result = await uploadUtilityMetersFromExcel(file);

      if (!result) {
        setError("⚠️ No result returned from upload function.");
        return;
      }

      if (result.errors?.length) {
        setError(
          `⚠️ Completed with ${result.errors[0].message} errors. Added: ${result.added.length}, Skipped: ${result.skipped.length}`
        );
      } else {
        setMessage(
          `✅ Successfully uploaded! Added: ${result.added.length}, Skipped: ${result.skipped.length}`
        );
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(`❌ Upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        All Readings Page
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" component="label" disabled={loading}>
        {loading ? "Uploading..." : "Upload Excel"}
        <input
          type="file"
          hidden
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </Button>

      {loading && <CircularProgress sx={{ ml: 2 }} />}
    </Box>
  );
};

export default AllReadingsPage;
function parseExcelDryRun(file: File) {
  throw new Error("Function not implemented.");
}
