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
import useOrders from "../hooks/useOrders";
import AdvancedTable from "../components/AdvancedTable";

export default function ProductPage() {
  const [orders, loading, error] = useOrders();
  const columns = [
    {
      Header: "שם פרטי",
      accessor: "firstName",
    },
    {
      Header: "שם משפחה",
      accessor: "lastName",
    },
    {
      Header: "מספר נייד",
      accessor: "phoneNumber",
    },
    {
      Header: "אמייל",
      accessor: "email",
    },

    {
      Header: "תשלום",
      accessor: "payment",
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }
  return <AdvancedTable data={orders} columns={columns} hasExport={true} />;
}
