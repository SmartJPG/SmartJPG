import React from "react";

const Theme = () => {
  const currentTheme = localStorage.getItem("theme");

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
      <div className="theme-container d-flex">
        {currentTheme === "" ? null : (
          <div className="original-theme" onClick={changeOriginal}></div>
        )}

        {currentTheme === "night" ? null : (
          <div className="night-theme" onClick={changeNight}></div>
        )}

        {currentTheme === "pro" ? null : (
          <div className="pro-theme" onClick={changePro}></div>
        )}
      </div>
    </div>
  );
};

export default Theme;
