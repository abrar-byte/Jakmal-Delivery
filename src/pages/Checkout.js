import React, { useEffect, useState } from "react";
import Steps from "../components/Steps";
import { Card, CurveHeader } from "../components/styled/Card";
import { BsArrowLeft } from "react-icons/bs";
import Delivery from "../components/Delivery";
import Summary from "../components/Summary";
import { useForm } from "react-hook-form";
import Payment from "../components/Payment";
import Finished from "../components/Finished";

export default function Checkout() {
  const [steps, setSteps] = useState(
    parseInt(localStorage.getItem("steps")) || 1
  );

  const [dropshipPrice, setDropshipPrice] = useState(0);
  const [total, setTotal] = useState("");
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {}
  );
  const {
    register,
    unregister,
    trigger,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: formData,
  });
  const [cost, setCost] = useState(500000);
  const [checkSteps, setCheckSteps] = useState(
    JSON.parse(localStorage.getItem("checkSteps")) || [1]
  );

  const [isData, setIsData] = useState(
    JSON.parse(localStorage.getItem("isData")) || ""
  );
  const [isChecked, setIsChecked] = useState(
    JSON.parse(localStorage.getItem("isDropshipper")) || false
  );
  const [isShipment, setIsShipment] = useState(
    JSON.parse(localStorage.getItem("isShipment")) || ""
  );
  const [code, setCode] = useState(localStorage.getItem("code") || "");
  const [isPayment, setIsPayment] = useState(
    JSON.parse(localStorage.getItem("isPayment")) || {
      id: 1,
      name: "e-Wallet",
      price: 15000,
    }
  );
  useEffect(() => {
    if (isChecked) {
      setDropshipPrice(5900);
    } else {
      setDropshipPrice(0);
    }
  }, [isChecked]);
  useEffect(() => {
    let newTotal;
    if (isShipment.price) {
      newTotal = cost + isShipment.price + dropshipPrice;
    } else {
      newTotal = cost + dropshipPrice;
    }
    setTotal(newTotal);
  }, [dropshipPrice, isShipment]);
  const handleRemoveAll = () => {
    const confirmed = window.confirm(
      "The cart section is still in the development stage. If you click 'ok' then you will reset all data!"
    );
    if (confirmed) {
      localStorage.removeItem("isData");
      localStorage.removeItem("formData");
      localStorage.removeItem("checkSteps");
      localStorage.removeItem("isChecked");

      localStorage.removeItem("isDropshipper");
      localStorage.removeItem("isShipment");
      localStorage.removeItem("isPayment");
      localStorage.removeItem("code");
      setIsData("");
      setCheckSteps([1]);
      setIsShipment("");
      setIsChecked(false);

      setIsPayment({
        id: 1,
        name: "e-Wallet",
        price: 15000,
      });
      setCode("");
      reset({ email: "", phone: "", address: "" });

      setFormData({ email: "", phone: "", address: "" });
    }
  };
  return (
    <div className="checkout">
      <Card>
        <CurveHeader>
          <Steps stepsProps={[steps, setSteps]} checkSteps={checkSteps} />
        </CurveHeader>
        {steps === 1 && (
          <button
            style={{ background: "none", border: "none" }}
            className="previous"
            onClick={handleRemoveAll}
          >
            <BsArrowLeft style={{ marginRight: "5px" }} /> Back to cart
          </button>
        )}
        {steps === 2 && (
          <button
            style={{ background: "none", border: "none" }}
            className="previous"
            onClick={() => setSteps(1)}
          >
            <BsArrowLeft style={{ marginRight: "5px" }} /> Back to delivery
          </button>
        )}
        {steps === 3 && (
          <button
            style={{ background: "none", border: "none", visibility: "hidden" }}
          >
            <BsArrowLeft style={{ marginRight: "5px" }} /> Back to delivery
          </button>
        )}
        <div className="grid-card">
          <div className="column-left">
            {steps === 1 && (
              <Delivery
                checkedProps={[isChecked, setIsChecked]}
                formDataProps={[formData, setFormData]}
                steps={steps}
                register={register}
                trigger={trigger}
                errors={errors}
                handleSubmit={handleSubmit}
                watch={watch}
                unregister={unregister}
              />
            )}
            {steps === 2 && (
              <Payment
                isShipmentProps={[isShipment, setIsShipment]}
                isPaymentProps={[isPayment, setIsPayment]}
                handleSubmit={handleSubmit}
              />
            )}
            {steps === 3 && (
              <Finished
                isShipment={isShipment}
                code={code}
                setSteps={setSteps}
              />
            )}
          </div>
          <div className="column-right">
            <Summary
              handleSubmit={handleSubmit}
              stepsProps={[steps, setSteps]}
              dropshipPrice={dropshipPrice}
              cost={cost}
              total={total}
              isPayment={isPayment}
              isShipment={isShipment}
              codeProps={[code, setCode]}
              isDataProps={[isData, setIsData]}
              checkStepsProps={[checkSteps, setCheckSteps]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
