import { useEffect, useState } from "react";
import { productsColumns } from "../data/tableData";
import SelectableTable from "../components/SelectableTable";
import Table from "../components/Table";
import { updateEvent, updateProduct } from "../services/firebase";
import styles from "./ProductPage.module.css";
import NewProductBanner from "../components/newProductBanner/NewProductBanner";
import useFirestore from "../hooks/useFirstore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import TableV2 from "../components/Table/TableV2";
import TableHead from "../components/Table/TableHead";
import TableBody from "../components/Table/TableBody";
import TableHeader from "../components/Table/TableHeader";
import Row from "../components/Table/Row";
import { Button, IconButton, Input } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ImageDrop from "../components/ImageDrop";
import { v4 } from "uuid";
import DropDownV2 from "../components/DropDownV2";

export default function ProductPage() {
  const [stores, addStore, updateStore, deleteStore] = useFirestore("stores");
  const [selectedStoreID, setSelectedStoreID] = useState(null);

  const selectedStore = stores.find((store) => store.id === selectedStoreID);

  const options = [
    { value: true, label: "גרמים" },
    { value: false, label: "יחידים" },
  ];

  const addProduct = (product) => {
    product = { ...product, id: v4() };
    updateStore({
      ...selectedStore,
      products: [...selectedStore.products, product],
    });
  };

  const deleteProduct = (productToDelete) => {
    updateStore({
      ...selectedStore,
      products: selectedStore.products.filter(
        (product) => product !== productToDelete
      ),
    });
  };

  const updateProductImage = async (productID, productImage) => {
    const imageRef = ref(storage, `${selectedStore.name}/${productID}`);
    await uploadBytes(imageRef, productImage);
    const imageUrl = await getDownloadURL(imageRef);
    updateProduct(productID, { imageUrl });
  };

  const updateProduct = (productID, modification) => {
    const originalProduct = selectedStore.products.find(
      (product) => product.id === productID
    );
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
  };

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
        // <Table
        //   data={selectedStore.products.map((product, index) => {
        //     return { ...product, id: index };
        //   })}
        //   columns={productsColumns}
        //   update={updateProduct}
        // />
        <TableV2>
          <TableHead>
            <TableHeader></TableHeader>
            <TableHeader>שם</TableHeader>
            <TableHeader>מחיר</TableHeader>
            <TableHeader>סוג</TableHeader>
            <TableHeader>תמונה</TableHeader>
          </TableHead>
          <TableBody>
            {selectedStore.products
              .sort((a, b) => b.price - a.price)
              .map((product) => (
                <Row>
                  <IconButton
                    onClick={() => {
                      deleteProduct(product);
                    }}
                  >
                    <RemoveCircleIcon style={{ color: "#d9534f" }} />
                  </IconButton>
                  <input
                    value={product.name}
                    onChange={(e) =>
                      updateProduct(product.id, { name: e.target.value })
                    }
                  />
                  <input
                    value={product.price}
                    onChange={(e) =>
                      updateProduct(product.id, { price: e.target.value })
                    }
                  />

                  <DropDownV2
                    options={options}
                    value={product.isGrams ? options[0] : options[1]}
                    onChange={(option) =>
                      updateProduct(product.id, { isGrams: option.value })
                    }
                  />

                  <ImageDrop
                    imageStartUrl={product.imageUrl}
                    onChange={(newImage) =>
                      updateProductImage(product.id, newImage)
                    }
                  />
                </Row>
              ))}
          </TableBody>
        </TableV2>
      )}
    </div>
  );
}
