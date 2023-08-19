import { useEffect } from "react";
import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { database as db } from "../../firebase";

export default function useFirestore(collectionName) {
  const [data, setData] = useState([]);

  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const addData = async (newData) => {
    await addDoc(collectionRef, newData);
  };

  const updateData = async (dataToUpdate) => {
    await updateDoc(doc(db, collectionName, dataToUpdate.id), dataToUpdate);
  };

  const deleteData = async (dataToRemove) => {
    await deleteDoc(doc(db, collectionName, dataToRemove.id));
  };

  return [data, addData, updateData, deleteData];
}
