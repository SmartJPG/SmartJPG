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
      <h1 className="slogan-item">
        <div className="slogan-item highlight-text-container">
          FREE & Unlimited <span className={`highlight ${step}`}></span>
        </div>{" "}
        Digital Tools.
      </h1>
    </div>
  );
};

export default Slogan;
