import React from "react";
import styles from "./NewProductBanner.module.css";
import { useState } from "react";
import { createProduct } from "../../services/firebase";

function NewProductBanner({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);

  const handlePriceChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setPrice(newValue);
    }
  };

  async function submitProduct(e) {
    e.preventDefault();

    if (name === "" || !price) {
      return;
    }

    addProduct({ name, price });
    setName("");
    setPrice(null);
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
              className={styles.eventField}
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="שם מוצר"
            />

            <input
              className={styles.eventField}
              value={price}
              type="number"
              onChange={handlePriceChange}
              placeholder="מחיר מוצר"
            />

            <button
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
