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
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Input,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ImageDrop from "../components/ImageDrop";
import { v4 } from "uuid";
import DropDownV2 from "../components/DropDownV2";
import CheckBox from "../components/CheckBox/CheckBox";

export default function ProductPage() {
  const [stores, addStore, updateStore, deleteStore] = useFirestore("stores");
  const [selectedStoreID, setSelectedStoreID] = useState(null);

  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

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
        <>
          <TableV2>
            <TableHead>
              <TableHeader></TableHeader>
              <TableHeader>שם</TableHeader>
              <TableHeader>מחיר</TableHeader>
              <TableHeader>הנחת חבר מועדון</TableHeader>
              <TableHeader>כמות</TableHeader>
              <TableHeader>סוג</TableHeader>
              <TableHeader>תמונה</TableHeader>
              <TableHeader>תיאור קצר</TableHeader>
              <TableHeader>הסתר</TableHeader>
            </TableHead>
            <TableBody>
              {selectedStore.products
                .sort((a, b) => b.price - a.price)
                .map((product) => (
                  <Row>
                    <IconButton
                      onClick={() => {
                        setProductToDelete(product);
                        setDeleteConfirmationOpen(true);
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

                    <input
                      value={product.discount}
                      onChange={(e) =>
                        updateProduct(product.id, { discount: e.target.value })
                      }
                    />

                    <input
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(product.id, { quantity: e.target.value })
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

                    <input
                      value={product.desc}
                      onChange={(e) =>
                        updateProduct(product.id, { desc: e.target.value })
                      }
                    />
                    <CheckBox
                      checked={product.hide}
                      update={(value) =>
                        updateProduct(product.id, { hide: value })
                      }
                    />
                  </Row>
                ))}
            </TableBody>
          </TableV2>
          <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setProductToDelete(null)}
            maxWidth="md" // Set the maximum width (can be "xs", "sm", "md", "lg", "xl")
            PaperProps={{
              style: {
                width: "20%", // Set the width of the dialog content
                maxHeight: "80vh", // Set the maximum height of the dialog content
              },
            }}
          >
            <DialogTitle id="alert-dialog-title">
              {"למחוק את המוצר ?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmationOpen(false)}>
                בטל
              </Button>
              <Button
                onClick={() => {
                  deleteProduct(productToDelete);
                  setDeleteConfirmationOpen(false);
                }}
                style={{ color: "red" }}
                autoFocus
              >
                מחק
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
