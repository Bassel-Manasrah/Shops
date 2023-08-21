import React from "react";
import styles from "./NewProductBanner.module.css";
import { useState } from "react";
import DropDownV2 from "../DropDownV2";
import CheckBox from "../CheckBox/CheckBox";

function NewProductBanner({ addProduct, disabled }) {
  const options = [
    { value: true, label: "גרמים" },
    { value: false, label: "יחידים" },
  ];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isGrams, setIsGrams] = useState(false);
  const [hide, setHide] = useState(false);

  const handleNumberInputChange = (e, setNumber) => {
    if (e.target.value === "") setNumber("");

    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setNumber(newValue);
    }
  };

  async function submitProduct(e) {
    e.preventDefault();

    if (name === "" || price === "" || discount === "") {
      return;
    }

    addProduct({ name, price, isGrams, desc, discount, quantity, hide });
    setName("");
    setPrice("");
    setDiscount("");
    setQuantity("");
    setDesc("");
    setHide(false);
  }

  return (
    <div className={styles.Content}>
      <div className={styles.Header}>
        <div className={styles.Layer}>מוצרים</div>
      </div>
      <div className={styles.Body}>
        <div className={styles.AddEvent}>
          <form onSubmit={submitProduct}>
            <input
              disabled={disabled}
              className={styles.Input}
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="שם מוצר"
            />

            <input
              variant="outlined"
              disabled={disabled}
              className={styles.Input}
              value={price}
              type="number"
              onChange={(e) => handleNumberInputChange(e, setPrice)}
              placeholder="מחיר מוצר"
            />

            <input
              variant="outlined"
              disabled={disabled}
              className={styles.Input}
              value={discount}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (value > 100 || value < 0) return;
                handleNumberInputChange(e, setDiscount);
              }}
              placeholder="הנחת חבר מועדון"
            />

            <input
              variant="outlined"
              disabled={disabled}
              className={styles.Input}
              value={quantity}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (value < 0) return;
                handleNumberInputChange(e, setQuantity);
              }}
              placeholder="כמות"
            />

            <DropDownV2
              options={options}
              value={isGrams ? options[0] : options[1]}
              onChange={(option) => setIsGrams(option.value)}
              isDisabled={disabled}
            />

            <input
              variant="outlined"
              disabled={disabled}
              className={styles.Input}
              value={desc}
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="תיאור קצר"
            />

            <button
              disabled={disabled}
              className={styles.addButton}
              type="submit"
              variant="contained"
            >
              הוספת מוצר
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProductBanner;
