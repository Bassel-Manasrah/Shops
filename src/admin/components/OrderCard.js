import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AdvancedTable from "./AdvancedTable";

export default function OrderCard({ order }) {
  const columnDefs = [
    {
      headerName: "שם מוצר",
      field: "name",
    },
    {
      headerName: "כמות",
      field: "quantity",
    },
    {
      headerName: "מחיר",
      field: "price",
    },
  ];

  return (
    <div
      className="ag-theme-quartz"
      style={{ border: "1px solid #3a6c87", height: "100%", width: "100%" }}
    >
      <AdvancedTable rowData={order.products} columnDefs={columnDefs} />
    </div>
  );
}
