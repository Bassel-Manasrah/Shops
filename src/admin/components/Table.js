import { useEffect, useState } from "react";
import Cell from "./Cell";
import styles from "./Table.module.css";

const Table = ({ data, columns, update }) => {
  return (
    <table className={styles.styledTable}>
      <thead>
        {columns.map((column) => (
          <th>{column.header}</th>
        ))}
      </thead>
      <tbody>
        {data.map((object) => (
          <tr>
            {columns.map((column, index) => (
              <Cell key={index} column={column} data={object} update={update} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
