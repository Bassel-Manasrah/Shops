import React from "react";
import { styled } from "styled-components";

const TrStyled = styled.tr`
  border-bottom: 1px solid #dddddd;
  padding: 10px 1px;
`;

export default function Row({ children }) {
  const childElements = Array.isArray(children) ? children : [children];

  return (
    <TrStyled>
      {childElements.map((child, index) => (
        <td key={index}>{child}</td>
      ))}
    </TrStyled>
  );
}
