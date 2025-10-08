import * as XLSX from "xlsx";

export const parseAddress = (fullAddress: string) => {
  const parts = fullAddress.split(",").map((p) => p.trim());

  if (parts.length < 3) {
    return { address: fullAddress, city: "" };
  }

  const address = parts.slice(0, 2).join(" ");

  const city = parts[2];

  return { address, city };
};

export const parseExcelSerialDate = (serial: number | string | undefined): Date | null => {
  if (serial === undefined || serial === null || serial === "") return null;

  if (typeof serial === "number") {
    // Excel stores dates as number of days since 1899-12-31
    const utc_days = serial - 25569;
    const utc_value = utc_days * 86400 * 1000;
    return new Date(utc_value);
  }

  if (typeof serial === "string") {
    // fallback to Latvian date string parser
    return parseLatvianDate(serial);
  }

  return null;
};

export const parseLatvianDate = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;

  // Handle common Latvian date formats: "01.07.2025" or "01/07/2025"
  const match = dateStr.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // JS months 0-11
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
};

export const parseLatvianAddress = (fullAddress: string): {
  city: string;
  address: string;
} => {
  if (!fullAddress) return { city: "", address: "" };

  const parts = fullAddress
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  // remove administrative suffixes (pagasts, novads)
  const filtered = parts.filter((p) => !/pagasts|novads/i.test(p));

  if (filtered.length === 0) return { city: "", address: "" };

  const last = filtered[filtered.length - 1]; // assume last meaningful part is city
  const beforeCity = filtered.slice(0, -1); // rest is address

  let address = beforeCity.join(", ");

  // normalize apartment/house numbers like “13, 6” → “13-6”
  address = address
    .replace(/\s*,\s*(\d+[A-Za-z]?)\s*,\s*(\d+[A-Za-z]?)$/, " $1-$2")
    .replace(/\s*,\s*(\d+[A-Za-z]?)$/, " $1")
    .replace(/\s+,/g, ",")
    .trim();

  return {
    city: last,
    address,
  };
}