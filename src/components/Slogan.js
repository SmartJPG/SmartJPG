import React, { useState, useEffect } from "react";
import "../App.css";

const Slogan = () => {
  const [step, setStep] = useState("one");

  useEffect(() => {
    setTimeout(() => {
      setStep("two");
    }, 100);

    setTimeout(() => {
      setStep("three");
    }, 200);

    setTimeout(() => {
      setStep("four");
    }, 300);
  }, []);
  return (
    <div className="slogan">
      <h2 className="slogan-item">
        <div className="slogan-item highlight-text-container">
          FREE
          <span className={`highlight ${step}`}></span>
        </div>{" "}
        Image & PDF Converter
      </h2>
    </div>
  );
};

export default Slogan;
