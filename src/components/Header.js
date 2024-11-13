import React, { useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Theme from "./Theme";

const Header = () => {
  const page = localStorage.getItem("page");

  useEffect(() => {
    if (page === "") {
      localStorage.setItem("page", "");
    }
  }, []);

  return (
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
                className={`swap ${page === "" ? "current" : ""} nav-link`}
                onClick={() => {
                  window.location.href = "/";
                  localStorage.setItem("page", "");
                }}
              >
                To JPG
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`swap ${page === "png" ? "current" : ""} nav-link`}
                onClick={() => {
                  window.location.href = "/png";
                  localStorage.setItem("page", "png");
                }}
              >
                To PNG
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`swap ${page === "RM" ? "current" : ""} nav-link`}
                onClick={() => {
                  window.location.href = "/remove-bg";
                  localStorage.setItem("page", "RM");
                }}
              >
                Remove Bg
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`swap ${page === "pdf" ? "current" : ""} nav-link`}
                onClick={() => {
                  window.location.href = "/pdf";
                  localStorage.setItem("page", "pdf");
                }}
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
            <Theme />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
