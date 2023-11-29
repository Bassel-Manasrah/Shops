function generateCsv(headers, data) {
  const headerRow = headers.map((header) => header.label).join(",");
  const dataRows = data
    .map((row) => headers.map((header) => row[header.key]).join(","))
    .join("\n");

  const csvContent = `${headerRow}\n${dataRows}`;
  return csvContent;
}

export default generateCsv;
