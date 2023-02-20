import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
  }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    vertical-align: middle;
  }

  input[type="checkbox"]:checked + span {
    border-color: #3ade8d;
  }

  input[type="checkbox"]:checked + span svg {
    display: block;
  }

  input[type="checkbox"]:checked + span span {
    display: none;
  }

  input[type="checkbox"]:checked + span svg path {
    fill: #3ade8d;
  }
`;

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>
        <AiOutlineCheck
          style={{ visibility: checked ? "visible" : "hidden" }}
          size={16}
        />
      </span>
      {label}
    </CheckboxWrapper>
  );
};
