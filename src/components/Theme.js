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
      <div className="theme-container">
        <div className="original-theme" onClick={changeOriginal}></div>
        {currentTheme === "" ? (
          <div className="theme-text">Original ✅</div>
        ) : (
          <div className="theme-text">Original</div>
        )}

        <div className="night-theme" onClick={changeNight}></div>

        {currentTheme === "night" ? (
          <div className="theme-text">Night ✅</div>
        ) : (
          <div className="theme-text">Night</div>
        )}
        <div className="pro-theme" onClick={changePro}></div>

        {currentTheme === "pro" ? (
          <div className="theme-text">Pro ✅</div>
        ) : (
          <div className="theme-text">Pro</div>
        )}
      </div>
    </div>
  );
};

export default Theme;
