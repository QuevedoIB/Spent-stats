import { useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { VscClose } from "react-icons/vsc";

import styles from "./Add.module.css";

import useToggle from "src/hooks/useToggle";
import useOutsideClick from "src/hooks/useOutsideClick";

const AddExpense: React.FC<{ text: string }> = ({ text, children }) => {
  const { toggled, handleToggle } = useToggle();
  const modalRef = useRef();

  const closeModal = useCallback(() => {
    handleToggle(false);
  }, [handleToggle]);

  useOutsideClick({ ref: modalRef, callback: closeModal });

  return (
    <>
      <button onClick={handleToggle}>{text}</button>
      {toggled &&
        ReactDOM.createPortal(
          <div className={styles.overlay}>
            <section ref={modalRef} className={styles.modalContainer}>
              <button
                type="button"
                className={styles.close}
                onClick={closeModal}
              >
                <VscClose size={"2rem"} />
              </button>
              {children}
            </section>
          </div>,
          document.body
        )}
    </>
  );
};

export default AddExpense;
