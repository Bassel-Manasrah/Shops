import { useState } from "react";
import AdvancedTable from "../components/AdvancedTable";
import Button from "../components/Button";
import OrderCard from "../components/OrderCard";
import useOrders from "../hooks/useOrders";
import styled from "styled-components";

export default function Dashboard() {
  const [orders, loading, error] = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      Header: "חבר מועדון",
      accessor: "isMember",
      Cell: ({ cell: { value } }) => <span>{value ? "כן" : "לא"}</span>,
    },
    {
      Header: "תשלום",
      accessor: "payment",
    },
    {
      Header: "טופל",
      accessor: "isDone",
      Cell: ({ cell: { value } }) => <span>{value ? "כן" : "לא"}</span>,
    },
    {
      id: "showOrderCard",
      Cell: ({ row }) =>
        row.original === selectedOrder ? (
          <Button color="red" onClick={() => setSelectedOrder(null)}>
            הסתר
          </Button>
        ) : (
          <Button onClick={() => setSelectedOrder(row.original)}>פרטים</Button>
        ),
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
            data={orders}
            selectedData={[selectedOrder]}
            columns={columns}
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
`;

const TableContainer = styled.div`
  overflow: auto;
  background-color: white;
`;

const OrderCardContainer = styled.div`
  background-color: blanchedalmond;
  overflow: auto;
`;
