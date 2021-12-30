import { useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { VscClose } from "react-icons/vsc";

import ExpenseForm from "src/components/buttons/AddExpense/Form";

import styles from "./AddExpense.module.css";

import useToggle from "src/hooks/useToggle";
import useOutsideClick from "src/hooks/useOutsideClick";

const AddExpense = () => {
  const { toggled, handleToggle } = useToggle();
  const modalRef = useRef();

  const closeModal = useCallback(() => {
    handleToggle(false);
  }, [handleToggle]);

  useOutsideClick({ ref: modalRef, callback: closeModal });

  return (
    <>
      <button onClick={handleToggle}>Add</button>
      {toggled &&
        ReactDOM.createPortal(
          <div className={styles.overlay}>
            <section ref={modalRef} className={styles.modalContainer}>
              <ExpenseForm />
              <button
                type="button"
                className={styles.close}
                onClick={closeModal}
              >
                <VscClose size={"2rem"} />
              </button>
            </section>
          </div>,
          document.body
        )}
    </>
  );
};

export default AddExpense;
