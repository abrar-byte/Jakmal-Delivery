import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#FF8A00")};
  color: ${(props) => (props.disabled ? "#666666" : "#fff")};
  border: none;
  padding: 20px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#e4800d")};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem
      ${(props) => (props.disabled ? "transparent" : "#ffa43c")};
  }
`;

export const ButtonSelect = styled.button`
  border: 1px solid;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3ade8d;
    cursor: pointer;
  }
`;
