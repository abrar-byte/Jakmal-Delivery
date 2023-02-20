import React from "react";
import { BiChevronRight } from "react-icons/bi";

export default function Steps({ stepsProps, checkSteps }) {
  const [steps, setSteps] = stepsProps;
  const handleSteps = (number) => {
    if (checkSteps.includes(number)) {
      localStorage.setItem("steps", number);
      setSteps(number);
    }
  };
  return (
    <div className="steps">
      <div
        className="box"
        style={{ cursor: "pointer" }}
        onClick={() => handleSteps(1)}
      >
        <div
          className="number"
          style={{
            backgroundColor: steps === 1 ? "#FF8A00" : "#FFE4B8",
            color: steps === 1 ? "#fff" : "#FF8A00",
          }}
        >
          1
        </div>
        <span className="value">Delivery</span>
      </div>
      <BiChevronRight className="steps-icon" />
      <div
        className="box"
        role="button"
        disabled={!checkSteps.includes(2)}
        style={{ cursor: checkSteps.includes(2) ? "pointer" : "not-allowed" }}
        onClick={() => handleSteps(2)}
      >
        <div
          className="number"
          style={{
            backgroundColor: steps === 2 ? "#FF8A00" : "#FFE4B8",
            color: steps === 2 ? "#fff" : "#FF8A00",
          }}
        >
          2
        </div>
        <span className="value">Payment</span>
      </div>
      <BiChevronRight className="steps-icon" />

      <div
        className="box"
        role="button"
        disabled={!checkSteps.includes(3)}
        style={{ cursor: checkSteps.includes(3) ? "pointer" : "not-allowed" }}
        onClick={() => handleSteps(3)}
      >
        <div
          className="number"
          style={{
            backgroundColor: steps === 3 ? "#FF8A00" : "#FFE4B8",
            color: steps === 3 ? "#fff" : "#FF8A00",
          }}
        >
          3
        </div>
        <span className="value">Finish</span>
      </div>
    </div>
  );
}
