import { useState, useEffect } from "react";
import { getOrders } from "../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrder = async (orderID, update) => {
    const docRef = doc(database, "orders", orderID);
    await updateDoc(docRef, update);
  };

  return [orders, loading, error, updateOrder];
}

export default useOrders;
