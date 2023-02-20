import React, { useEffect, useState } from "react";
import { Checkbox } from "./styled/Checkbox";
import { InputStyled, TextAreaStyled } from "./styled/Input";
import { BorderTitle, Title } from "./styled/Text";

export default function Delivery({
  checkedProps,
  register,
  trigger,
  errors,
  handleSubmit,
  watch,
  formDataProps,
  unregister,
  steps,
}) {
  const [isChecked, setIsChecked] = checkedProps;
  const [formData, setFormData] = formDataProps;

  const [addressCount, setAddressCount] = useState(120);

  const handleCheckboxChange = (e) => {
    localStorage.setItem("isDropshipper", e.target.checked);
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (formData.address) {
      const remainingCount = 120 - formData.address.length;
      setAddressCount(remainingCount);
    }
  }, [formData]);
  useEffect(() => {
    if (!isChecked) {
      unregister("dropshipper_name");
      unregister("dropshipper_phone");
    }
  }, [isChecked, unregister]);

  return (
    <>
      <div className="delivery-title">
        <div>
          <Title>Delivery details</Title>
          <BorderTitle></BorderTitle>
        </div>
        <div>
          {" "}
          <Checkbox
            label="Send as dropshipper"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <form className="delivery-grid">
        <div className="column-1">
          <InputStyled
            label="Email"
            name="email"
            type="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            steps={steps}
            errors={errors}
            register={register}
            trigger={trigger}
            formDataProps={[formData, setFormData]}
            watch={watch}
          />
          <InputStyled
            label="Phone Number"
            name="phone"
            steps={steps}
            rules={{
              pattern: {
                value: /^[0-9()+-]{6,20}$/,
                message: "Invalid phone number format",
              },
            }}
            errors={errors}
            register={register}
            trigger={trigger}
            formDataProps={[formData, setFormData]}
            watch={watch}
          />
          <TextAreaStyled
            label="Address"
            steps={steps}
            name="address"
            rules={{ required: "Address is required", maxLength: 120 }}
            errors={errors}
            register={register}
            trigger={trigger}
            watch={watch}
            addressCountProps={[addressCount, setAddressCount]}
            formDataProps={[formData, setFormData]}
          />
        </div>
        <div
          className="column-2"
          style={{ visibility: isChecked ? "visible" : "hidden" }}
        >
          <InputStyled
            label="Dropshipper name"
            name="dropshipper_name"
            rules={
              isChecked
                ? { required: "Dropshipper name is required" }
                : undefined
            }
            errors={errors}
            register={register}
            trigger={trigger}
            formDataProps={[formData, setFormData]}
            watch={watch}
            steps={steps}
          />
          <InputStyled
            label="Dropshipper phone number"
            name="dropshipper_phone"
            rules={
              isChecked
                ? {
                    required: "Dropshipper phone is required",
                    pattern: {
                      value: /^[0-9()+-]{6,20}$/,
                      message: "Invalid phone number format",
                    },
                  }
                : undefined
            }
            errors={errors}
            register={register}
            trigger={trigger}
            formDataProps={[formData, setFormData]}
            watch={watch}
            steps={steps}
          />
        </div>
      </form>
    </>
  );
}
