import React, { useEffect, useState } from "react";
import styles from "./StoresPage.module.css";
import NewStoreBanner from "../../components/newStoreBanner/NewStoreBanner";
import StoreList from "../../components/StoreList";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { database as db } from "../../../firebase";

export default function StoresPage() {
  const [stores, setStores] = useState([]);

  const storesCollectionRef = collection(db, "stores");

  const addStore = async (newStore) => {
    await addDoc(storesCollectionRef, newStore);
  };

  const deleteStore = async (storeToRemove) => {
    await deleteDoc(doc(db, "stores", storeToRemove.id));
  };

  useEffect(() => {
    onSnapshot(storesCollectionRef, (snapshot) => {
      setStores(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className={styles.container}>
      <NewStoreBanner addStore={addStore} />
      <div className={styles.storeList}>
        <StoreList stores={stores} deleteStore={deleteStore}></StoreList>
      </div>
    </div>
  );
}
