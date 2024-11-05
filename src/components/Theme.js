import React from "react";

const Theme = () => {
  const changeOriginal = () => {
    localStorage.setItem("theme", "");
    window.location.reload();
  };

  const changeNight = () => {
    localStorage.setItem("theme", "night");
    window.location.reload();
  };

  const changePro = () => {
    localStorage.setItem("theme", "pro");
    window.location.reload();
  };

  return (
    <div className="Theme">
      <div className="theme-container">
        <div className="original-theme" onClick={changeOriginal}></div>
        <div className="night-theme" onClick={changeNight}></div>
        <div className="pro-theme" onClick={changePro}></div>
      </div>
    </div>
  );
};

export default Theme;
