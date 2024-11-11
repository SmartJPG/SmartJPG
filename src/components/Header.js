import React from "react";
import "../App.css";
import Logo from "./Logo";

const Header = () => (
  <div>
    <div className="Header">
      <div className="d-flex swap-btns">
        <Logo />

        <div>
          <button className="swap" onClick={() => (window.location.href = "/")}>
            To JPG
          </button>
        </div>

        <div>
          <button
            className="swap current"
            onClick={() => (window.location.href = "/png")}
          >
            To PNG
          </button>
        </div>

        <div>
          <button
            className="swap"
            onClick={() => (window.location.href = "/remove-bg")}
          >
            Remove Bg
          </button>
        </div>

        <div>
          <button
            className="swap"
            onClick={() => (window.location.href = "/pdf")}
          >
            Merge PDFs
          </button>
        </div>

        <div>
          <button
            className="swap"
            onClick={() => (window.location.href = "/split")}
          >
            Split PDF
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
