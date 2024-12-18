import { useEffect, useState } from "react";
import { productsColumns } from "../data/tableData";
import SelectableTable from "../components/SelectableTable";
import Table from "../components/Table";
import styles from "./ProductPage.module.css";
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
import NewProductBannerV2 from "../components/NewProductBannerV2";
import useProducts from "../hooks/useProducts";
import useStores from "../hooks/useStores";

export default function ProductPage() {
  const { stores, storesLoading } = useStores();
  const [selectedStoreID, setSelectedStoreID] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const selectedStore = stores?.find((store) => store.id === selectedStoreID);

  const {
    products,
    loading: productsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductWithoutCommit,
  } = useProducts(selectedStoreID);

  const options = [
    { value: true, label: "גרמים" },
    { value: false, label: "יחידים" },
  ];
  const updateProductImage = async (productID, productImage) => {
    const imageRef = ref(storage, `productsImages/${productID}`);
    await uploadBytes(imageRef, productImage);
    const imageUrl = await getDownloadURL(imageRef);
    updateProduct(productID, { imageUrl });
  };
  return (
    <div className={styles.container}>
      <h1 className="text-3xl mb-6 font-bold">מוצרים</h1>
      <div className={styles.header}>
        <NewProductBannerV2 addProduct={addProduct} disabled={!selectedStore} />
      </div>
      <select
        onChange={(e) => {
          setSelectedStoreID(e.target.value);
        }}
      >
        <option disabled selected className={styles.optionclass} value="">
          תבחר חנות
        </option>
        {stores?.map((store) => (
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
              {products.map((product) => (
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
                    onChange={(e) => {
                      updateProductWithoutCommit(product.id, {
                        name: e.target.value,
                      });
                    }}
                    onBlur={(e) =>
                      updateProduct(product.id, {
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    value={product.price}
                    onChange={(e) => {
                      updateProductWithoutCommit(product.id, {
                        price: e.target.value,
                      });
                    }}
                    type="number"
                    onBlur={(e) =>
                      updateProduct(product.id, {
                        price: parseInt(e.target.value, 10),
                      })
                    }
                  />
                  <input
                    value={product.discount}
                    onChange={(e) => {
                      updateProductWithoutCommit(product.id, {
                        discount: e.target.value,
                      });
                    }}
                    type="number"
                    onBlur={(e) =>
                      updateProduct(product.id, {
                        discount: parseInt(e.target.value, 10),
                      })
                    }
                  />
                  <input
                    value={product.quantity}
                    onChange={(e) => {
                      updateProductWithoutCommit(product.id, {
                        quantity: e.target.value,
                      });
                    }}
                    type="number"
                    onBlur={(e) =>
                      updateProduct(product.id, {
                        quantity: parseInt(e.target.value, 10),
                      })
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
                    onBlur={(e) =>
                      updateProduct(product.id, { desc: e.target.value })
                    }
                  />
                  <CheckBox
                    checked={product.isHide}
                    update={(value) =>
                      updateProduct(product.id, { isHide: value })
                    }
                  />
                </Row>
              ))}
            </TableBody>
          </TableV2>
          <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setProductToDelete(null)}
            maxWidth="md"
            PaperProps={{
              style: {
                width: "20%",
                maxHeight: "80vh",
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
                  console.log(productToDelete.name);
                  deleteProduct(productToDelete.id);
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
