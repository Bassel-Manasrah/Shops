import { useEffect, useState } from "react";
import styles from "./Input.module.css";

function Input({ type, value, onEdit }) {
  const [data, setData] = useState(value);

  useEffect(() => {
    setData(value);
    // console.log(value);
  }, [value]);

  return (
    <input
      className={styles.myInput}
      value={data}
      type={type}
      onBlur={(e) => onEdit(e.target.value)}
      onChange={(e) => setData(e.target.value)}
    />
  );
}

export default Input;
