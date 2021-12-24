import styles from "./Spinner.module.css";

interface ISpinner {
  size?: number;
}

const Spinner = ({ size }: ISpinner) => {
  return (
    <div
      className={styles.spinner}
      style={{
        ...(size
          ? {
              height: `${size}px`,
              width: `${size}px`,
              borderWidth: `${size / 10}px`,
            }
          : {}),
      }}
    />
  );
};

export default Spinner;
