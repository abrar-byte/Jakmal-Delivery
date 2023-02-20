import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCheck, MdClose } from "react-icons/md";

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding-right: 40px;
`;

const FormControl = styled.input`
  border: none;
  border: 1px solid;
  outline: none;
  font-size: 14px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  font-weight: 700;

  width: 100%;
  border-color: ${({ isError }) => {
    switch (isError) {
      case true:
        return "#FF8A00";
      case false:
        return "#3ADE8D";

      default:
        return "#EEEEEE";
    }
  }};
  &:focus {
    border-color: ${({ isError }) => {
      switch (isError) {
        case true:
          return "#FF8A00";
        case false:
          return "#3ADE8D";

        default:
          return "#3ADE8D";
      }
    }};
  }
`;

const TextArea = styled.textarea`
  border: none;
  border: 1px solid;
  outline: none;
  font-size: 14px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  width: 100%;
  font-weight: 700;

  height: 100px;
  border-color: ${({ isError }) => {
    switch (isError) {
      case true:
        return "#FF8A00";
      case false:
        return "#3ADE8D";

      default:
        return "#EEEEEE";
    }
  }};
  &:focus {
    border-color: ${({ isError }) => {
      switch (isError) {
        case true:
          return "#FF8A00";
        case false:
          return "#3ADE8D";
        default:
          return "#6c757d";
      }
    }};
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: ${({ floating }) => (floating ? "5px" : "1.5rem")};
  left: 1.5rem;
  font-size: ${({ floating }) => (floating ? "12px" : "14px")};
  pointer-events: none;
  transition: all 0.2s ease;
  color: ${({ isError }) => {
    switch (isError) {
      case true:
        return "#FF8A00";
      case false:
        return "#3ADE8D";

      default:
        return "#6c757d";
    }
  }};
`;
const ValidationIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-30%);
  color: ${({ isError }) => (isError ? "#FF8A00" : "#3ADE8D")};
`;

export function InputStyled({
  label,
  name,
  register,
  rules,
  errors,
  trigger,
  formDataProps,
  watch,
  steps,
}) {
  const [floating, setFloating] = useState(false);
  const [formData, setFormData] = formDataProps;

  const [valid, setValid] = useState(null);
  const [isError, setIsError] = useState(null);

  function handleBlur(event) {
    if (!event.target.value) {
      setFloating(false);
    }
    trigger(event.target.name);
  }

  function handleFocus() {
    setFloating(true);
    setValid(true);
  }
  useEffect(() => {
    trigger(name);
  }, [name, trigger]);

  useEffect(() => {
    if (watch(name)) {
      setFloating(true);
      setValid(true);
    } else {
      setFloating(false);
    }
  }, [watch, name]);
  useEffect(() => {
    if (valid) {
      if (errors[name]) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  }, [errors[name]]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        [name]: value,
      })
    );
    setFormData({ ...formData, [name]: value });
  };
  return (
    <FormGroup>
      <FormControl
        name={name}
        {...register(name, rules)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        isError={isError}
        onKeyUp={handleInputChange}
      />
      <FormLabel isError={isError} floating={floating}>
        {label}
      </FormLabel>
      {valid && (
        <ValidationIcon isError={isError}>
          {isError ? <MdClose /> : <MdCheck />}
        </ValidationIcon>
      )}
    </FormGroup>
  );
}

export function TextAreaStyled({
  label,
  name,
  register,
  rules,
  errors,
  trigger,
  formDataProps,
  watch,
  addressCountProps,
}) {
  const [floating, setFloating] = useState(false);

  const [valid, setValid] = useState(null);
  const [isError, setIsError] = useState(null);
  const [formData, setFormData] = formDataProps;
  const [addressCount, setAddressCount] = addressCountProps;

  function handleBlur(event) {
    if (!event.target.value) {
      setFloating(false);
    }
    trigger(event.target.name);
  }

  function handleFocus() {
    setFloating(true);
    setValid(true);
  }
  useEffect(() => {
    trigger(name);
  }, [name, trigger]);

  useEffect(() => {
    if (watch(name)) {
      setFloating(true);
      setValid(true);
    } else {
      setFloating(false);
    }
  }, [watch, name]);
  useEffect(() => {
    if (valid) {
      if (errors[name]) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  }, [errors[name]]);

  const handleAddressChange = (event) => {
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        [name]: event.target.value,
      })
    );
    const remainingCount = 120 - event.target.value.length;
    setAddressCount(remainingCount);
  };
  return (
    <FormGroup>
      <TextArea
        name={name}
        {...register(name, rules)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        isError={isError}
        onKeyUp={handleAddressChange}
      />
      <FormLabel isError={isError} floating={floating}>
        {label}
      </FormLabel>
      {valid && (
        <ValidationIcon isError={isError}>
          {isError ? <MdClose /> : <MdCheck />}
        </ValidationIcon>
      )}
      <span
        style={{
          position: "absolute",
          bottom: "5px",
          right: "3px",
          fontSize: "12px",
        }}
      >
        {addressCount} characters remaining
      </span>
    </FormGroup>
  );
}
