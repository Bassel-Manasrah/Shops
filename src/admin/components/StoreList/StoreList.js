import React, { useState } from "react";
import styles from "./StoreList.module.css";
import { Button } from "@mui/material";

export default function StoreList({ stores, deleteStore }) {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className={styles.container}>
      {stores.map((store) => (
        <div
          className={`${styles.storeCard} ${
            selectedStore === store ? styles.selected : ""
          }`}
          onClick={() => setSelectedStore(store)}
        >
          {store.name}
        </div>
      ))}
      {selectedStore && (
        <div className={styles.controlPanel}>
          <Button
            className={styles.button}
            variant="contained"
            color="error"
            onClick={() => {
              deleteStore(selectedStore);
              setSelectedStore(null);
            }}
          >
            מחק
          </Button>
        </div>
      )}
    </div>
  );
}
