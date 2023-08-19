import { useEffect, useState } from "react";
import { productsColumns } from "../data/tableData";
import SelectableTable from "../components/SelectableTable";
import Table from "../components/Table";
import { updateEvent, updateProduct } from "../services/firebase";
import styles from "./ProductPage.module.css";
import NewProductBanner from "../components/newProductBanner/NewProductBanner";
import useFirestore from "../hooks/useFirstore";

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

  const updateProduct = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NewProductBanner notifyNewProduct={addProduct} />
      </div>
      <select
        onChange={(e) => {
          setSelectedStoreID(e.target.value);
        }}
      >
        <option className={styles.optionclass} value={"NONE"}>
          תבחר חנות
        </option>
        {stores.map((store) => (
          <option className={styles.optionclass} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
      {selectedStoreID && (
        <>
          <Table
            data={selectedStore.products}
            columns={productsColumns}
            update={updateProduct}
          />
        </>
      )}
    </div>
  );
}
