import React, { useEffect, useState } from "react";
import styles from "./StoresPage.module.css";
import NewStoreBanner from "../../components/newStoreBanner/NewStoreBanner";
import StoreList from "../../components/StoreList";
import useFirestore from "../../hooks/useFirstore";

export default function StoresPage() {
  const [stores, addStore, deleteStore] = useFirestore("stores");

  return (
    <div className={styles.container}>
      <NewStoreBanner addStore={addStore} />
      <div className={styles.storeList}>
        <StoreList stores={stores} deleteStore={deleteStore}></StoreList>
      </div>
    </div>
  );
}
