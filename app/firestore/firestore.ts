import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, doc, setDoc, getDoc, Timestamp, getDocs } from "firebase/firestore"; 
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as XLSX from "xlsx";
import { parseAddress, parseExcelSerialDate, parseLatvianAddress, parseLatvianDate } from "./utils/utils";


export interface AddressMapping {
  [city: string]: {
    [address: string]: string[];
  };
}

interface UploadResult {
  errors: { row: number; message: string }[];
  added: string[];
  skipped: string[];
}


interface Mapping {
  [city: string]: {
    [address: string]: string[];
  };
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);

export const addNewEntryWithRetry = async (utilityMeeter: UtilityMeeter): Promise<boolean> => {
  let attempt = 0;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  while (attempt < MAX_RETRIES) {
    try {
      const docRef = doc(db, "utilityMeters", utilityMeeter.id);
      await setDoc(docRef, utilityMeeter);
      return true;
    } catch (err) {
      attempt++;
      if (attempt < MAX_RETRIES) {
        await new Promise((res) => setTimeout(res, RETRY_DELAY));
      } else {
        saveEntryForLater(utilityMeeter);
        return false; 
      }
    }
  }

  return false; 
};

const saveEntryForLater = (entry: UtilityMeeter) => {
  const pending = JSON.parse(localStorage.getItem("pendingEntries") || "[]");
  pending.push(entry);
  localStorage.setItem("pendingEntries", JSON.stringify(pending));
};

export const retryPendingEntries = async () => {
  const pending: UtilityMeeter[] = JSON.parse(
    localStorage.getItem("pendingEntries") || "[]"
  );
  if (!pending.length) return;

  const successful: string[] = [];

  for (const entry of pending) {
    const success = await addNewEntryWithRetry(entry);
    if (success) successful.push(entry.id);
  }

  if (successful.length) {
    const remaining = pending.filter((e) => !successful.includes(e.id));
    localStorage.setItem("pendingEntries", JSON.stringify(remaining));
  }
};


export const login = (email:string, password:string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const uploadUtilityMetersFromExcel = async (
  file: File
): Promise<UploadResult> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const added: string[] = [];
  const skipped: string[] = [];
  const errors: { row: number; message: string }[] = [];

   for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      const id = row["SkaE.Numurs"];
      if (!id) continue;

      const { address, city } = parseLatvianAddress(row["Address"]);
      const date = parseExcelSerialDate(row["SkaE.Nāk.verifikācijas datums"]);


      const docRef = doc(db, "utilityMeters", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        skipped.push(id);
        continue;
      }

      const utilityMeter: UtilityMeeter = {
        id,
        adress: address,
        city: city,
        details: {
          action: "Pārbaude",
          radijums: row["Rādījums"] || "",
          iemesls: row["Daudzuma tips"] || "",
          novietojums: row["SkaE.Ska.Kods"] || "",
          atrodas: "",
          kanalizacija: "",
          ipasums: "",
          installed: [],
          tips: row["SkaE.SkaEksMar.Tips"] || "",
          plombaNr: row["SkaE.Plombas Nr."] || "",
          marka: row["SkaE.SkaEksMar.Nosaukums"] || "",
          diametrs: row["SkaE.SkaEksMar.Diametrs"] || "",
          garums: row["SkaE.Lielums"] || "",
          piezimes: row["Piezīmes"] || "",
          verifiedDate: date,
        },
        signiture: {
          clientSigniture: "",
          workerSigniture: "",
          worker: "",
          date: date,
        },
      };

      await setDoc(docRef, utilityMeter);
      added.push(id);

      await updateAddressMapping(city, address, id);
    } catch (err: any) {
      console.error(`Error on row ${i + 1}:`, err);
      errors.push({
        row: i + 1,
        message: err?.message || "Unknown error",
      });
    }}

  return { added, skipped, errors  };
};


export const updateAddressMapping = async (
  rawCityOrAddress: string,
  rawAddressOrEmpty: string,
  meterId: string
) => {
  const fullAddress =
    rawAddressOrEmpty && rawCityOrAddress
      ? `${rawAddressOrEmpty}, ${rawCityOrAddress}`
      : rawCityOrAddress;

  const { city, address } = parseLatvianAddress(fullAddress);

  if (!city || !address) {
    console.warn("Could not parse address:", fullAddress);
    return;
  }

  const docRef = doc(db, "addresses", "cityMapping");
  const docSnap = await getDoc(docRef);
  const mapping: Mapping = docSnap.exists() ? (docSnap.data() as Mapping) : {};

  if (!mapping[city]) mapping[city] = {};
  if (!mapping[city][address]) mapping[city][address] = [];

  if (!mapping[city][address].includes(meterId)) {
    mapping[city][address].push(meterId);
  }

  await setDoc(docRef, mapping);

};

export const getAddressMapping = async (): Promise<AddressMapping> => {
  const docRef = doc(db, "addresses", "cityMapping");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as AddressMapping) : {};
};

export const getUtilityMeeterById = async (
  id: string
): Promise<UtilityMeeter | null> => {
  if (!id) return null;
  const docRef = doc(collection(db, "utilityMeters"), id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  const data = docSnap.data() as UtilityMeeter;

  // Type-safe conversion
  if (data.details.verifiedDate && (data.details.verifiedDate as any).toDate) {
    data.details.verifiedDate = (data.details.verifiedDate as unknown as Timestamp).toDate();
  }

  if (data.signiture.date && (data.signiture.date as any).toDate) {
    data.signiture.date = (data.signiture.date as unknown as Timestamp).toDate();
  }

  return data;
};

export const getUserCredentails = () => {
  const email =  auth.currentUser?.email
  if(email){
    const emailNameSurname = email.split("@")[0]
    const name = emailNameSurname.split(".")[0].toUpperCase()
     const surname = emailNameSurname.split(".")[1].toUpperCase()
     return name + " " +surname
  }

}

export const getAllEntries = async () => {
  const querySnapshot = await getDocs(collection(db, "utilityMeters"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UtilityMeeter[];

  return data 
}