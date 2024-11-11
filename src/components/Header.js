import React from "react";
import "../App.css";
import Logo from "./Logo";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => (
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <a className="navbar-brand" href="/">
        SmartJPG
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
              className="swap nav-link"
              onClick={() => (window.location.href = "/")}
            >
              To JPG
            </button>
          </li>
          <li className="nav-item">
            <button
              className="swap nav-link"
              onClick={() => (window.location.href = "/png")}
            >
              To PNG
            </button>
          </li>
          <li className="nav-item">
            <button
              className="swap nav-link"
              onClick={() => (window.location.href = "/remove-bg")}
            >
              Remove Bg
            </button>
          </li>
          <li className="nav-item">
            <button
              className="swap nav-link"
              onClick={() => (window.location.href = "/pdf")}
            >
              Merge PDFs
            </button>
          </li>
          {/* <li className="nav-item">
            <button
              className="swap nav-link"
              onClick={() => (window.location.href = "/split")}
            >
              Split PDF
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
