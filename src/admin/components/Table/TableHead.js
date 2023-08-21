import React from "react";

export default function TableHead({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}
