import React from "react";
import useUsers from "../hooks/useUsers";
import AdvancedTable from "../components/AdvancedTable";
import styled from "styled-components";

export default function UsersPage() {
  const { users, loading, promoteToMember, demoteToUser } = useUsers([]);

  const columnDefs = [
    {
      headerName: "שם פרטי",
      field: "firstname",
    },
    {
      headerName: "שם משפחה",
      field: "lastname",
    },
    {
      headerName: "מספר נייד",
      field: "phone",
    },
    {
      headerName: "אמייל",
      field: "email",
    },
    {
      headerName: "חבר מועדון",
      field: "isMember",
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
  ];

  if (loading) {
    return <h1>loading ...</h1>;
  }

  return (
    <PageContainer>
      <PageTitle>לקוחות</PageTitle>
      <TableContainer>
        <AdvancedTable
          rowData={users}
          columnDefs={columnDefs}
          hasExport={true}
        />
      </TableContainer>
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

const TableContainer = styled.div`
  overflow: auto;
  background-color: white;
  border: 1px #3a6c87 solid;
  flex: 1;
`;

const OrderCardContainer = styled.div`
  background-color: blanchedalmond;
  overflow: auto;
`;
