import React from "react";
import { BorderTitle, Title } from "./styled/Text";
import { BsArrowLeft } from "react-icons/bs";

export default function Finished({ code, isShipment, setSteps }) {
  return (
    <div className="finished">
      <div className="grid">
        <div>
          <Title>Thank you</Title>
          <BorderTitle></BorderTitle>
        </div>
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Order ID: {code}
          </div>
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            You order will be delivered {isShipment.estimate} with{" "}
            {isShipment.name}
          </span>
        </div>
        <span
          className="previous"
          onClick={() => {
            localStorage.setItem("steps", 1);
            setSteps(1);
          }}
        >
          <BsArrowLeft style={{ marginRight: "5px" }} /> Go to homepage
        </span>
      </div>
    </div>
  );
}
