import { saveAs } from "file-saver";
import generateWorkbook from "./generateWorkbook";

export default function downloadWorkbook({ columns, data, filename }) {
  const workbook = generateWorkbook({ columns, data });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, filename);
  });
}
