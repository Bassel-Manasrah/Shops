import Button from "./Button";
import { useTable } from "react-table";
import styled from "styled-components";
import downloadWorkbook from "../excelUtils/downloadWorkbook";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo } from "react";

export default function AdvancedTable({ rowData, columnDefs, onRowSelected }) {
  const exportClickHandler = () => {
    const modifiedColumns = columnDefs.map((col) => ({
      header: col.headerName,
      key: col.field,
    }));
    downloadWorkbook({
      data: rowData,
      columns: modifiedColumns,
      filename: "file",
    });
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      filter: true,
    };
  }, []);

  const gridOptions = {
    suppressCellFocus: true,
    singleClickEdit: true,
    suppressCellFocus: true,
    stopEditingWhenCellsLoseFocus: true,
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        style={{ width: "100%", backgroundColor: "#3a6c87", color: "white" }}
        onClick={exportClickHandler}
      >
        קובץ אקסל
      </button>
      <div className="ag-theme-quartz" style={{ flex: 1 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRtl={true}
          rowSelection={"single"}
          gridOptions={gridOptions}
          onRowSelected={onRowSelected}
        />
      </div>
    </div>
  );
}
