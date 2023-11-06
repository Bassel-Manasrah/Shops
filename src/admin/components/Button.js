import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.color || "#007bff"};
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Button;
