"use client";
import Selector from "~/components/Selector";
import styles from "./utilityMeeterPage.module.css";
import Form from "~/components/Form";
import SignOff from "~/components/SignOff";
import { useState } from "react";
import { Button } from "@mui/material";
import { addNewEntry } from "~/firestore/firestore";
import Modal from "~/components/Modal";
import { useNavigate } from "react-router";
export interface UtilityMeeter {
  id: string;
  adress: string;
  city: string;
  details: {
    action: "Pārbaude" | "Nomaiņa";
    radijums: string;
    iemesls: string;
    novietojums: string;
    atrodas: string;
    kanalizacija: string;
    ipasums: string;
    installed: string[];
    tips: string;
    plombaNr: string;
    marka: string;
    diametrs: string;
    garums: string;
    skaititajaTips: string;
    piezimes: string;
    verifiedDate: Date | null;
  };
}

export interface Signature {
  clientSigniture: string;
  workerSigniture: string;
  worker: string;
  date: Date;
}

const UtilityMeeterPage = () => {
  const [utilityMeeter, setUtilityMeeter] = useState<UtilityMeeter | null>(
    null
  );
  const [signiture, setSigniture] = useState<Signature | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const handleUploadFormData = async () => {
    if (!utilityMeeter) return;

    setIsLoading(true);
    setUploadSuccess(null);

    const success = await addNewEntry(utilityMeeter);

    setIsLoading(false);
    setUploadSuccess(success);
  };

  const closeModal = () => {
    setIsLoading(false);
    setUploadSuccess(null);
    setUtilityMeeter(null);
    navigate("/");
  };

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
          />
          <SignOff setSigniture={setSigniture} />
          <div className={styles.buttonContainer}>
            <Button
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
