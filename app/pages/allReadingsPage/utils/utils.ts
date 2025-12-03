import { jsPDF } from "jspdf";
import type { OldMeeter, UtilityMeeter } from "~/pages/utilityMeeterPage";
import "./Roboto-Regular-normal.js";

export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

const toDate = (value: unknown): Date | null => {
  if (!value) return null;

  // Firestore Timestamp-like object
  const ts = value as FirestoreTimestamp;
  if (
    typeof ts === "object" &&
    ts !== null &&
    typeof ts.seconds === "number" &&
    typeof ts.nanoseconds === "number"
  ) {
    return new Date(ts.seconds * 1000 + ts.nanoseconds / 1_000_000);
  }

  // Already a JS Date
  if (value instanceof Date) return value;

  return null;
};

const formatLvDate = (value: unknown): string => {
  const date = toDate(value);
  if (!date) return "";
  return date.toLocaleDateString("lv-LV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const generateFullPDF = (entry: UtilityMeeter) => {
  // --- Dates ---

  // Verifikācijas datums (when meter was verified) – from NEW/current meter
  const formattedVerifiedOnDate = formatLvDate(
    entry.details?.verifiedOnDate as unknown
  );

  // Verificēts līdz (valid until) – depends on action
  // - Pārbaude: use current meter's verifiedTillDate
  // - Nomaiņa: use OLD meter's verifiedTillDate (the one removed)
  let verifiedTillSource: unknown = null;
  if (entry.details.action === "Pārbaude") {
    verifiedTillSource = entry.details?.verifiedTillDate as unknown;
  } else if (entry.oldMeeter) {
    verifiedTillSource = entry.oldMeeter.details?.verifiedTillDate as unknown;
  }

  const formattedVerifiedTillDate = formatLvDate(verifiedTillSource);

  // Document/signature date
  const formattedSignatureDate = formatLvDate(
    entry.signiture?.date as unknown
  );

  const doc = new jsPDF();
  doc.setFont("Roboto-Regular");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const col1x = margin;
  const col2x = pageWidth / 2;
  let y = 20;

  // --- Header ---
  doc.setFontSize(16);
  doc.text(
    `Ūdens skaitītāja ${
      entry.details.action === "Pārbaude" ? "pārbaudes" : "nomaiņas"
    } akts Nr. ${entry.details.plombaNr || ""}`,
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 12;

  doc.setFontSize(12);
  doc.text(`ID: ${entry.id}`, margin, y);
  y += 8;

  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Client Info ---
  doc.setFontSize(14);
  doc.text("Klienta informācija", margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.text(`Vārds, Uzvārds: ${entry.client?.clientFullName || ""}`, col1x, y);
  doc.text(`Telefons: ${entry.client?.mobileNr || ""}`, col2x, y);
  y += 10;

  // Horizontal line
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Address Info ---
  doc.setFontSize(12);
  doc.text(`${entry.city || ""} ${entry.adress || ""}`, col1x, y);
  y += 10;

  // Horizontal line
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  let detailsRows: string[][] = [];
  const d = entry;

  if (entry.details.action === "Pārbaude") {
    // --- SINGLE METER (CHECK) ---
    doc.setFontSize(14);
    doc.text("Skaitītāja informācija", margin, y);
    y += 8;
    doc.setFontSize(12);

    doc.text(`ID: ${d.id || ""}`, col1x, y);
    y += 8;

    detailsRows = [
      [
        `Darbība: ${d.details.action || ""}`,
        `Rādījums: ${d.details.radijums || ""}`,
      ],
      [
        `Iemesls: ${d.details.iemesls || ""}`,
        `Novietojums: ${d.details.novietojums || ""}`,
      ],
      [`Atrodas: ${d.details.atrodas || ""}`, `Tips: ${d.details.tips || ""}`],
      [
        `Marka: ${d.details.marka || ""}`,
        `Diametrs: ${d.details.diametrs || ""}`,
      ],
      [
        `Garums: ${d.details.garums || ""}`,
        `Plombas Nr.: ${d.details.plombaNr || ""}`,
      ],
      [
        `Piezīmes: ${d.details.piezimes || ""}`,
        `Veids: ${d.details.veids || ""}`,
      ],
    ];

    for (const row of detailsRows) {
      doc.text(row[0], col1x, y);
      doc.text(row[1], col2x, y);
      y += 8;
    }
  } else {
    // --- NOMAIŅA: OLD + NEW ---

    // Old meter
    if (entry.oldMeeter) {
      const oldUtility: OldMeeter = entry.oldMeeter;
      doc.setFontSize(14);
      doc.text("Noņemtā skaitītāja informācija", margin, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(`ID: ${oldUtility.id || ""}`, col1x, y);
      y += 8;

      detailsRows = [
        [
          `Darbība: ${oldUtility.details.action || ""}`,
          `Rādījums: ${oldUtility.details.radijums || ""}`,
        ],
        [
          `Iemesls: ${oldUtility.details.iemesls || ""}`,
          `Novietojums: ${oldUtility.details.novietojums || ""}`,
        ],
        [
          `Atrodas: ${oldUtility.details.atrodas || ""}`,
          `Tips: ${oldUtility.details.tips || ""}`,
        ],
        [
          `Marka: ${oldUtility.details.marka || ""}`,
          `Diametrs: ${oldUtility.details.diametrs || ""}`,
        ],
        [
          `Garums: ${oldUtility.details.garums || ""}`,
          `Plombas Nr.: ${oldUtility.details.plombaNr || ""}`,
        ],
        [
          `Piezīmes: ${oldUtility.details.piezimes || ""}`,
          `Veids: ${oldUtility.details.veids || ""}`,
        ],
      ];

      for (const row of detailsRows) {
        doc.text(row[0], col1x, y);
        doc.text(row[1], col2x, y);
        y += 8;
      }
    }

    // Space before new meter
    y += 4;

    // New meter
    doc.setFontSize(14);
    doc.text("Jaunā skaitītāja informācija", margin, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(`ID: ${d.id || ""}`, col1x, y);
    y += 8;

    detailsRows = [
      [
        `Darbība: ${d.details.action || ""}`,
        `Rādījums: ${d.details.radijums || ""}`,
      ],
      [
        `Iemesls: ${d.details.iemesls || ""}`,
        `Novietojums: ${d.details.novietojums || ""}`,
      ],
      [`Atrodas: ${d.details.atrodas || ""}`, `Tips: ${d.details.tips || ""}`],
      [
        `Marka: ${d.details.marka || ""}`,
        `Diametrs: ${d.details.diametrs || ""}`,
      ],
      [
        `Garums: ${d.details.garums || ""}`,
        `Plombas Nr.: ${d.details.plombaNr || ""}`,
      ],
      [
        `Piezīmes: ${d.details.piezimes || ""}`,
        `Veids: ${d.details.veids || ""}`,
      ],
    ];

    for (const row of detailsRows) {
      doc.text(row[0], col1x, y);
      doc.text(row[1], col2x, y);
      y += 8;
    }
  }

  // Dates section (below details)
  if (formattedVerifiedOnDate) {
    doc.text(`Verifikācijas datums: ${formattedVerifiedOnDate}`, col1x, y);
    y += 8;
  }

  if (formattedVerifiedTillDate && d.details.action == "Pārbaude") {
    doc.text(`Verificēts līdz: ${formattedVerifiedTillDate}`, col1x, y);
    y += 8;
  }

  // Horizontal line
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // --- Signatures ---
  doc.setFontSize(14);
  doc.text("Paraksti", margin, y);
  y += 8;
  doc.setFontSize(12);

  const sigHeight = 40;
  const sigWidth = (pageWidth - 3 * margin) / 2;

  // Worker box
  doc.rect(margin, y, sigWidth, sigHeight);
  doc.text(`Darbinieks: ${entry.signiture?.worker || ""}`, margin + 2, y + 8);

  if (entry.signiture?.workerSigniture) {
    doc.addImage(
      entry.signiture.workerSigniture,
      "PNG",
      margin + 2,
      y + 12,
      sigWidth - 4,
      sigHeight - 16
    );
  } else {
    doc.text("Nav", margin + 2, y + 20);
  }

  // Client box
  const rightX = margin + sigWidth + margin;
  doc.rect(rightX, y, sigWidth, sigHeight);
  doc.text(
    `Klients: ${entry.client?.clientFullName || ""}`,
    rightX + 2,
    y + 8
  );

  if (entry.signiture?.clientSigniture) {
    doc.addImage(
      entry.signiture.clientSigniture,
      "PNG",
      rightX + 2,
      y + 12,
      sigWidth - 4,
      sigHeight - 16
    );
  } else {
    doc.text("Nav", rightX + 2, y + 20);
  }

  y += sigHeight + 10;

  // Document date
  if (formattedSignatureDate) {
    doc.text(`Datums: ${formattedSignatureDate}`, margin, y);
  }

  // --- Save PDF ---
  doc.save(`reading_full_${entry.id}.pdf`);
};
