import React from "react";
import useUsers from "../hooks/useUsers";
import AdvancedTable from "../components/AdvancedTable";
import styled from "styled-components";

export default function UsersPage() {
  const { users, loading, promoteToMember, demoteToUser } = useUsers([]);

  const columns = [
    {
      Header: "שם פרטי",
      accessor: "firstname",
    },
    {
      Header: "שם משפחה",
      accessor: "lastname",
    },
    {
      Header: "מספר נייד",
      accessor: "phone",
    },
    {
      Header: "אמייל",
      accessor: "email",
    },
    {
      Header: "חבר מועדון",
      accessor: "isMember",
      Cell: ({ row: { original } }) => (
        <input
          type="checkbox"
          checked={original.isMember}
          onChange={async (e) => {
            e.target.checked
              ? await promoteToMember(original.id)
              : await demoteToUser(original.id);
          }}
        />
      ),
    },
  ];

  if (loading) {
    return <h1>loading ...</h1>;
  }

  return (
    <PageContainer>
      <PageTitle>לקוחות</PageTitle>
      <FlexContainer>
        <TableContainer>
          <AdvancedTable data={users} columns={columns} />
        </TableContainer>
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
