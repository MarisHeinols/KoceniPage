import Selector from "~/components/Selector";
import styles from "./skaititajiPage.module.css";
import Form from "~/components/Form";

const SkaititajiPage = () => {
  return (
    <div className={styles.content}>
      <Selector />
      <Form />
    </div>
  );
};

export default SkaititajiPage;
