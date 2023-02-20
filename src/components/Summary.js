import React from "react";
import { Button } from "./styled/Button";
import { generateRandomString, numberWithCommas } from "./Utils";

export default function Summary({
  stepsProps,
  dropshipPrice,
  isDataProps,
  cost,
  total,
  handleSubmit,
  isShipment,
  isPayment,
  codeProps,
  checkStepsProps,
}) {
  const [steps, setSteps] = stepsProps;
  const [code, setCode] = codeProps;
  const [isData, setIsData] = isDataProps;
  const [checkSteps, setCheckSteps] = checkStepsProps;

  const onSubmit = (data) => {
    if (steps === 1) {
      localStorage.setItem("isData", JSON.stringify({ ...isData, ...data }));
      setIsData({ ...isData, ...data });
      setSteps(2);
      if (checkSteps.length < 2) {
        localStorage.setItem("checkSteps", JSON.stringify([1, 2]));

        setCheckSteps([1, 2]);
      }
    } else {
      let newRandomString;
      if (!code) {
        newRandomString = generateRandomString();
      } else {
        newRandomString = code;
      }
      if (checkSteps.length < 3) {
        localStorage.setItem("checkSteps", JSON.stringify([1, 2, 3]));

        setCheckSteps([1, 2, 3]);
      }
      localStorage.setItem(
        "isData",
        JSON.stringify({
          ...isData,
          payment: isPayment,
          shipment: isShipment,
          code: newRandomString,
          cost: cost,
          total: total,
          dropshipPrice: dropshipPrice,
        })
      );

      setIsData({
        ...isData,
        payment: isPayment,
        shipment: isShipment,
        code: newRandomString,
        cost: cost,
        total: total,
        dropshipPrice: dropshipPrice,
      });
      localStorage.setItem("code", newRandomString);

      setCode(newRandomString);
      setSteps(3);
    }
  };

  return (
    <div className="summary">
      <h3 className="title">Summary</h3>
      <span className="subtitle">10 items purchased</span>
      <div className="border"></div>
      {isShipment && (
        <>
          <span style={{ fontSize: "12px" }}>Delivery Estimation</span>
          <span className="estimate">{`${isShipment.estimate} by ${isShipment.name}`}</span>
        </>
      )}

      {steps === 3 && isPayment && (
        <>
          <div className="border"></div>
          <span style={{ fontSize: "12px" }}>Payment Method</span>
          <span className="estimate">{isPayment.name}</span>
        </>
      )}
      <div className="grow"></div>
      <div className="datas">
        <span className="name">Cost of Goods</span>
        <span className="value">{numberWithCommas(cost)}</span>
      </div>
      {dropshipPrice !== 0 && (
        <div className="datas">
          <span className="name">Dropshipping Fee</span>
          <span className="value">{numberWithCommas(dropshipPrice)}</span>
        </div>
      )}
      {isShipment && (
        <div className="datas">
          <span className="name">
            <span style={{ fontWeight: "bold" }}>{isShipment.name}</span>{" "}
            shipment
          </span>
          <span className="value">{numberWithCommas(isShipment.price)}</span>
        </div>
      )}
      <div className="datas">
        <span className="name-total">Total</span>
        <span className="value-total">{numberWithCommas(total)}</span>
      </div>
      {steps !== 3 && (
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={steps === 2 && !isShipment}
        >
          {steps === 1 ? "Continue to Payment" : `Pay with ${isPayment.name}`}
        </Button>
      )}
    </div>
  );
}
