import React from "react";
import styles from "./NewStoreBanner.module.css";
import { useState } from "react";
import { createStore } from "../../services/firebase";

export default function NewStoreBanner({ addStore }) {
  const [storeName, setStoreName] = useState("");

  async function submitStore(e) {
    e.preventDefault();

    if (storeName === "") {
      return;
    }
    addStore({ name: storeName, products: [] });
    setStoreName("");
  }

  return (
    <div className={styles.Content}>
      <div className={styles.Header}>
        <div className={styles.Layer}>חנויות</div>
      </div>
      <div className={styles.Body}>
        <div className={styles.AddEvent}>
          <form onSubmit={submitStore}>
            <input
              className={styles.eventField}
              value={storeName}
              type="text"
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="שם של החנות"
            />

            <button
              className={styles.addButton}
              type="submit"
              variant="contained"
            >
              הוספת חנות
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
