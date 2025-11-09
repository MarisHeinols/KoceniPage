"use client";

import React, { useEffect, useMemo, useState } from "react";
import UploadNewExcel from "~/components/UploadNewExcel";
import { Button, CircularProgress, IconButton, Input } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getAllEntries } from "~/firestore/firestore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import styles from "./AllReadingsPage.module.css";
import type { UtilityMeeter } from "../utilityMeeterPage";
import { generateFullPDF } from "./utils/utils";

interface GridRow {
  id: string;
  city: string;
  adress: string;
  signitureWorker: string;
  radijums: string;
  dateStr: string;
  dateValue: number;
}

const AllReadingsPage = () => {
  const [rows, setRows] = useState<GridRow[]>([]);
  const [allEntries, setAllEntries] = useState<UtilityMeeter[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "dateStr", desc: true },
  ]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const parseDateValue = (d: any): number => {
    if (!d) return 0;
    if (typeof d === "string") {
      const parsed = Date.parse(d);
      return isNaN(parsed) ? 0 : parsed;
    }
    if (d instanceof Date) return d.getTime();
    if (d.seconds) return d.seconds * 1000;
    return 0;
  };

  const formatFirestoreDate = (d: any): string => {
    try {
      if (!d) return "";
      if (typeof d === "string") return d;
      if (d instanceof Date) return d.toLocaleString();
      if (d.seconds) return new Date(d.seconds * 1000).toLocaleString();
      return "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllEntries(true).then((data) => {
      setAllEntries(data);

      const processed = data.map((row) => {
        const dateVal = parseDateValue(row.signiture?.date);
        return {
          id: row.id,
          city: row.city || "",
          adress: row.adress || "",
          signitureWorker: row.signiture?.worker || "",
          radijums: row.details?.radijums || "",
          dateStr: formatFirestoreDate(row.signiture?.date),
          dateValue: dateVal,
        };
      });

      processed.sort((a, b) => b.dateValue - a.dateValue);
      setRows(processed);
      setLoading(false);
    });
  }, []);

  const columns = useMemo<ColumnDef<GridRow>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "city", header: "Vieta" },
      { accessorKey: "adress", header: "Adrese" },
      { accessorKey: "signitureWorker", header: "Darbinieks" },
      { accessorKey: "radijums", header: "Rādījums" },
      {
        accessorKey: "dateStr",
        header: "Laiks",
      },
      {
        id: "actions",
        header: "PDF",
        cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={async () => {
              const fullEntry = allEntries.find(
                (e) => e.id === row.original.id
              );
              if (fullEntry) await generateFullPDF(fullEntry);
            }}
            title="Lejupielādēt pilnu PDF"
          >
            <PictureAsPdfIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  if (loading) return <CircularProgress />;

  return (
    <div className={styles.allReadingPageContainer}>
      <h1 className={styles.headerText}>Visi Rādijumi</h1>

      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Meklēt pēc jebkura lauka..."
          className="border border-gray-300 rounded px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-600">
          Ieraksti kopā: {rows.length}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 select-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`p-2 border-b font-semibold ${
                        canSort ? "cursor-pointer hover:bg-gray-200" : ""
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {sortDir === "asc" && " ▲"}
                      {sortDir === "desc" && " ▼"}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-gray-500"
                >
                  Nav atrastu rezultātu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="text-sm text-gray-600">
          Lapa {pageIndex + 1} no{" "}
          {Math.max(1, Math.ceil(rows.length / pageSize))}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="outlined"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Atpakaļ
          </Button>
          <Button
            variant="contained"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Nākamā
          </Button>
        </div>
      </div>

      <UploadNewExcel />
    </div>
  );
};

export default AllReadingsPage;
