import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/Button";
import OrderCard from "../components/OrderCard";
import useOrders from "../hooks/useOrders";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ButtonBase, Checkbox } from "@mui/material";
import AdvancedTable from "../components/AdvancedTable";

export default function Dashboard() {
  const gridRef = useRef();
  const [orders, loading, error, updateOrder] = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const onRowSelected = useCallback((event) => {
    const order = event.data;
    setSelectedOrder(order);
  }, []);

  const columnDefs = [
    {
      field: "orderId",
      headerName: "מספר הזמנה",
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
    },
    {
      field: "phoneNumber",
      headerName: "מספר נייד",
    },
    {
      field: "email",
      headerName: "מייל",
    },
    {
      field: "isMember",
      headerName: "חבר מועדון",
      cellRenderer: ({ data }) => {
        return (
          <div
            style={{
              color: data.isMember ? "green" : "red",
            }}
          >
            {data.isMember ? "כן" : "לא"}
          </div>
        );
      },
    },
    {
      field: "payment",
      headerName: "תשלום",
    },
    {
      field: "isDone",
      headerName: "טופל",
      editable: true,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <PageContainer>
      <PageTitle>הזמנות</PageTitle>
      <FlexContainer>
        <TableContainer>
          <AdvancedTable
            columnDefs={columnDefs}
            rowData={orders}
            onRowSelected={onRowSelected}
            onEdit={(order) => updateOrder(order.id, order)}
          />
        </TableContainer>
        {selectedOrder && (
          <OrderCardContainer>
            <OrderCard order={selectedOrder} />
          </OrderCardContainer>
        )}
      </FlexContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 32px;
  background-color: #eff5fb;
`;

const PageTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 32px;
  min-height: 0;
  flex-grow: 1;
`;

const TableContainer = styled.div`
  overflow: auto;
  flex: 3;
  border: 1px solid #3a6c87;
`;

const OrderCardContainer = styled.div`
  background-color: blanchedalmond;
  overflow: auto;
  flex: 1;
`;
