import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.color || "#007bff"};
  color: #fff;
  padding: ${(props) => props.padding || "8px 16px"};
  border: none;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.0);
  } */
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

export default Button;
