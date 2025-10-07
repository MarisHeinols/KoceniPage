import type { ReactNode } from "react";
import styles from "./Modal.module.css";
import { Button } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, isLoading, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        {isLoading ? (
          <h2>Lūdzu Uzgaidiet</h2>
        ) : (
          <>
            <h2>Saglabāts</h2>
            <Button
              variant="contained"
              onClick={() => {
                onClose();
              }}
              sx={{ height: "3rem" }}
            >
              Aizvērt
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
