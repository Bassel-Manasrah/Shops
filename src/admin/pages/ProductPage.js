import { useEffect, useState } from "react";
import { productsColumns } from "../data/tableData";
import SelectableTable from "../components/SelectableTable";
import Table from "../components/Table";
import { updateEvent, updateProduct } from "../services/firebase";
import styles from "./ProductPage.module.css";
import NewProductBanner from "../components/newProductBanner/NewProductBanner";
import useFirestore from "../hooks/useFirstore";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function ProductPage() {
  const [stores, addStore, updateStore, deleteStore] = useFirestore("stores");
  const [selectedStoreID, setSelectedStoreID] = useState(null);

  const selectedStore = stores.find((store) => store.id === selectedStoreID);

  const addProduct = (product) => {
    updateStore({
      ...selectedStore,
      products: [...selectedStore.products, product],
    });
  };

  const updateProduct = (productIndex, modification) => {
    if (modification.image) {
      const imageRef = ref(storage, `${selectedStore.name}/${productIndex}`);
      uploadBytes(imageRef, modification.image);
    } else {
      const originalProduct = selectedStore.products[productIndex];
      const updatedProduct = { ...originalProduct, ...modification };

      updateStore({
        ...selectedStore,
        products: [
          ...selectedStore.products.filter(
            (product) => product !== originalProduct
          ),
          updatedProduct,
        ],
      });
    }
  };
  console.log(selectedStore);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NewProductBanner addProduct={addProduct} disabled={!selectedStore} />
      </div>
      <select
        onChange={(e) => {
          setSelectedStoreID(e.target.value);
        }}
      >
        <option disabled selected className={styles.optionclass} value="">
          תבחר חנות
        </option>
        {stores.map((store) => (
          <option className={styles.optionclass} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
      {selectedStoreID && (
        <Table
          data={selectedStore.products.map((product, index) => {
            return { ...product, id: index };
          })}
          columns={productsColumns}
          update={updateProduct}
        />
      )}
    </div>
  );
}
