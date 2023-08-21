import React from "react";
import styled from "styled-components";

const ThStyled = styled.th`
  background-color: rgb(87, 121, 91, 0.959);
  color: #ffffff;
  text-align: right;
  padding: 10px 1px;
`;

export default function TableHeader({ children }) {
  return <ThStyled>{children}</ThStyled>;
}
