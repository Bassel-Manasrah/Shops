import ExcelJS from "exceljs";

export default function generateWorkbook({ columns, data }) {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Sheet1");
  worksheet.columns = columns;

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  return workbook;
}
