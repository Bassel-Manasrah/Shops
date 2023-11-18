import { useEffect, useState } from "react";
import { database as db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function useStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const storesCollection = collection(db, "stores");

  const fetchStores = async () => {
    const snapshot = await getDocs(storesCollection);
    const stores = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setStores(stores);
    setLoading(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return { stores, loading };
}

export default useStores;
