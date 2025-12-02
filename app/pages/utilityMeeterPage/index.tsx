"use client";
import Selector from "~/components/Selector";
import styles from "./utilityMeeterPage.module.css";
import Form from "~/components/Form";
import SignOff from "~/components/SignOff";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addNewEntryWithRetry } from "~/firestore/firestore";
import Modal from "~/components/Modal";
import { useNavigate } from "react-router";

export interface UtilityMeeter {
  id: string;
  adress: string;
  city: string;
  details: Details;
  signiture: Signature;
  client: Client;
  oldMeeter?: OldMeeter;
}

export interface Signature {
  clientSigniture: string;
  workerSigniture: string;
  worker: string;
  date: Date | null;
}

export interface Client {
  clientFullName: string;
  mobileNr: string;
}

export interface OldMeeter {
  id: string;
  details: Details;
}

export interface Details {
  action: "Pārbaude" | "Nomaiņa";
  radijums: string;
  iemesls: string;
  novietojums: string;
  atrodas: string;
  installed: string[];
  tips: string;
  plombaNr: string;
  marka: string;
  diametrs: string;
  garums: string;
  piezimes: string;
  verifiedTillDate: Date | null;
  veids: string;
}

const UtilityMeeterPage = () => {
  const [utilityMeeter, setUtilityMeeter] = useState<UtilityMeeter | null>(
    null
  );
  const [signiture, setSigniture] = useState<Signature | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [formIsCompleted, setIsFormCompleted] = useState(false);

  const navigate = useNavigate();

  const handleUploadFormData = async () => {
    if (!utilityMeeter) return;
    setIsLoading(true);
    setUploadSuccess(null);

    const success = await addNewEntryWithRetry(utilityMeeter);

    setIsLoading(false);
    setUploadSuccess(success);
  };

  const closeModal = () => {
    setIsLoading(false);
    setUploadSuccess(null);
    setUtilityMeeter(null);
    navigate("/");
  };

  useEffect(() => {
    const currentUtilityMeeter = utilityMeeter;
    if (signiture) {
      currentUtilityMeeter!.signiture = signiture;
      setUtilityMeeter(currentUtilityMeeter);
    }
  }, [signiture]);

  return (
    <div className={styles.content}>
      <Modal isOpen={loading || uploadSuccess !== null} onClose={closeModal} />
      <Selector
        setUtilityMeeter={setUtilityMeeter}
        utilityMeeter={utilityMeeter}
      />
      {utilityMeeter && (
        <>
          <Form
            utilityMeeter={utilityMeeter}
            setUtilityMeeter={setUtilityMeeter}
            setIsFormCompleted={setIsFormCompleted}
          />
          <SignOff setSigniture={setSigniture} />
          <div>
            <Button
              disabled={signiture && formIsCompleted ? false : true}
              variant="contained"
              onClick={() => {
                handleUploadFormData();
              }}
            >
              Iesniegt
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UtilityMeeterPage;
