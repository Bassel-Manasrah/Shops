import React from "react";
import AdvancedTable from "./AdvancedTable";

export default function OrderCard({ order }) {
  const columns = [
    {
      Header: "שם מוצר",
      accessor: "name",
    },
    {
      Header: "כמות",
      accessor: "quantity",
    },
    {
      Header: "מחיר",
      accessor: "price",
    },
  ];

  return (
    <AdvancedTable data={order.products} columns={columns} width="300px" />
  );
}
