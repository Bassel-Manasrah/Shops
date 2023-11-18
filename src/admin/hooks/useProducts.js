import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase";
import { useEffect, useState } from "react";

function useProducts(storeID) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    if (!storeID) {
      return;
    }
    if (!store) {
      await fetchStore();
    }
    onSnapshot(storeDocRef, async (snapshot) => {
      const store = { ...snapshot.data(), id: snapshot.id };
      const produtsSnapshot = await getDocs(productsCollectionRef);
      const allProducts = produtsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      const storeProducts = store.products;

      setProducts(
        allProducts.filter((product) => storeProducts.includes(product.id))
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, [storeID]);

  if (!storeID) {
    return {
      products: [],
      loading: false,
      addProduct: () => {},
      updateProduct: () => {},
      deleteProduct: () => {},
    };
  }

  const productsCollectionRef = collection(database, "products");

  let store = null;
  const storeDocRef = doc(database, "stores", storeID);

  const fetchStore = async () => {
    const storeDoc = await getDoc(storeDocRef);
    store = { ...storeDoc.data(), id: storeDoc.id };
  };

  const addProduct = async (newProduct) => {
    if (!store) {
      await fetchStore();
    }
    const productDocRef = await addDoc(productsCollectionRef, newProduct);
    const productID = productDocRef.id;
    await updateDoc(storeDocRef, { products: [...store.products, productID] });
  };

  const updateProduct = async (productID, update) => {
    const productDocRef = doc(database, "products", productID);
    await updateDoc(productDocRef, update);
    await getProducts();
  };

  const deleteProduct = async (productID) => {
    if (!store) {
      await fetchStore();
    }
    const productDocRef = doc(database, "products", productID);
    await deleteDoc(productDocRef);
    await updateDoc(storeDocRef, {
      products: [...store.products.filter((product) => product != productID)],
    });
    await getProducts();
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}

export default useProducts;
