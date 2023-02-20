import React from "react";
import { ButtonSelect } from "./styled/Button";
import { BorderTitle, Title } from "./styled/Text";
import { FaCheck } from "react-icons/fa";
import { payment, shipment } from "./PaymentData";
import { numberWithCommas } from "./Utils";

export default function Payment({ isShipmentProps, isPaymentProps }) {
  const [isShipment, setIsShipment] = isShipmentProps;
  const [isPayment, setIsPayment] = isPaymentProps;
  const handleShipment = (item) => {
    localStorage.setItem("isShipment", JSON.stringify(item));
    setIsShipment(item);
  };
  const handlePayment = (item) => {
    localStorage.setItem("isPayment", JSON.stringify(item));
    setIsPayment(item);
  };
  return (
    <>
      <div className="delivery-title">
        <div>
          <Title>Shipment</Title>
          <BorderTitle></BorderTitle>
        </div>
        <div>
          {" "}
          <div style={{ visibility: "hidden" }}></div>
        </div>
      </div>
      <div className="payment-grid">
        {shipment.map((item) => (
          <ButtonSelect
            onClick={() => handleShipment(item)}
            key={item.id}
            style={{
              borderColor: isShipment.id === item.id ? "#3ADE8D" : "#6c757d",
              backgroundColor:
                isShipment.id === item.id ? "#E8FBF1" : "transparent",
            }}
          >
            <div className="grid">
              <span>{item.name}</span>
              <span className="amount">{numberWithCommas(item.price)}</span>
            </div>
            <FaCheck
              style={{
                visibility: isShipment.id === item.id ? "visible" : "hidden",
                color: "#3ADE8D",
              }}
            />
          </ButtonSelect>
        ))}
      </div>
      <div className="delivery-title" style={{ marginTop: "3rem" }}>
        <div>
          <Title>Payment</Title>
          <BorderTitle></BorderTitle>
        </div>
        <div>
          {" "}
          <div style={{ visibility: "hidden" }}></div>
        </div>
      </div>
      <div className="payment-grid">
        {payment.map((item) => (
          <ButtonSelect
            onClick={() => handlePayment(item)}
            key={item.id}
            style={{
              borderColor: isPayment.id === item.id ? "#3ADE8D" : "#6c757d",
              backgroundColor:
                isPayment.id === item.id ? "#E8FBF1" : "transparent",
            }}
          >
            <div className="grid">
              <span>{item.name}</span>
              <span className="amount">
                {item.amount ? numberWithCommas(item.amount) + " left" : ""}
              </span>
            </div>
            <FaCheck
              style={{
                visibility: isPayment.id === item.id ? "visible" : "hidden",
                color: "#3ADE8D",
              }}
            />
          </ButtonSelect>
        ))}
      </div>
    </>
  );
}
