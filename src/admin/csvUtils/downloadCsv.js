import { saveAs } from "file-saver";
import generateCsv from "./generateCsv";

function downloadCsv(headers, data, filename) {
  const csvContent = generateCsv(headers, data);
  const fileType = "text/csv;charset=utf-8;";
  const blob = new Blob([csvContent], { type: fileType });
  saveAs(blob, filename);
}

export default downloadCsv;
