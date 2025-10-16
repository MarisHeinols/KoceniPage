"use client";
import React, { useEffect, useState, Suspense } from "react";
import UploadNewExcel from "~/components/UploadNewExcel";
import { GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import type { UtilityMeeter } from "../utilityMeeterPage";
import { getAllEntries } from "~/firestore/firestore";
import styles from "./AllReadingsPage.module.css";

// DO NOT import CSS directly
// import "@mui/x-data-grid/style/css";
// import "@mui/x-data-grid/index.css";
declare module "*.css";

// Lazy load DataGrid to avoid Node executing its CSS import
const DataGrid = React.lazy(() =>
  import("@mui/x-data-grid").then((mod) => ({ default: mod.DataGrid }))
);

interface GridRow {
  id: string;
  city: string;
  adress: string;
  signitureWorker: string;
  radijums: string;
  dateStr: string;
}

const AllReadingsPage = () => {
  const [rows, setRows] = useState<GridRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const formatFirestoreDate = (d: any) => {
    if (!d) return "";
    if (typeof d === "string") return d;
    if (d instanceof Date) return d.toLocaleString();
    if (d?.seconds) return new Date(d.seconds * 1000).toLocaleString();
    return "";
  };

  useEffect(() => {
    setLoading(true);
    getAllEntries().then((data) => {
      setRows(
        data.map((row) => ({
          id: row.id,
          city: row.city,
          adress: row.adress,
          signitureWorker: row.signiture?.worker || "",
          radijums: row.details?.radijums || "",
          dateStr: formatFirestoreDate(row.signiture?.date),
        }))
      );
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "city", headerName: "Vieta", width: 150 },
    { field: "adress", headerName: "Adrese", width: 200 },
    { field: "signitureWorker", headerName: "Darbinieks", width: 150 },
    { field: "radijums", headerName: "Rādījums", width: 120, type: "number" },
    { field: "dateStr", headerName: "Laiks", width: 180 },
  ];

  return (
    <div
      className={styles.allReadingPageContainer}
      style={{ height: 600, width: "100%" }}
    >
      <h1 className={styles.headerText}>Visi Rādijumi</h1>
      <Suspense fallback={<CircularProgress />}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          autoHeight
        />
      </Suspense>
      <UploadNewExcel />
    </div>
  );
};

export default AllReadingsPage;
