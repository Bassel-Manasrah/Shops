import { useEffect, useState } from "react";
import styles from "./Input.module.css";

function Input({ type, value, onEdit }) {
  const [data, setData] = useState(value);

  const handleNumberInputChange = (e) => {
    if (e.target.value === "") setData("");

    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setData(newValue);
    }
  };

  useEffect(() => {
    setData(value);
    // console.log(value);
  }, [value]);

  return (
    <input
      className={styles.myInput}
      value={data}
      type={type}
      onBlur={(e) => onEdit(data)}
      onChange={
        type == "number"
          ? handleNumberInputChange
          : (e) => setData(e.target.value)
      }
    />
  );
}

export default Input;
