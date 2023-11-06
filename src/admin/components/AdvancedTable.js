import { useTable } from "react-table";
import styled from "styled-components";

export default function AdvancedTable({ data, selectedData = [], columns }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <HeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <HeaderCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </HeaderCell>
              ))}
            </HeaderRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                selected={selectedData.includes(row.original)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

const Table = styled.table`
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background-color: #f5f5f5;
`;

const HeaderCell = styled.th`
  border: 1px solid #dddddd;
  text-align: right;
  padding: 8px;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.selected ? "#d8f3dc" : "")};
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: right;
  padding: 8px;
`;
