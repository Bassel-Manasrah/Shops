import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 16px;
  font-family: "Poppins";
  width: 1300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  direction: rtl;
  background-color: white;
`;

export default function TableV2({ children }) {
  return <StyledTable>{children}</StyledTable>;
}
