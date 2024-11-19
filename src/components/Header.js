import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const location = useLocation();
  const page = location.pathname;
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("theme", "pro");
  }, [page]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          SmartJPG
        </Link>

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
              <Link
                to="/"
                className={`swap ${page === "/" ? "current" : ""} nav-link`}
              >
                To JPG
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  ["/png", "/remove-bg"].includes(page) ? "current" : ""
                }`}
                id="pngDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                To PNG
              </button>

              <ul className="dropdown-menu" aria-labelledby="pngDropdown">
                <li>
                  <Link
                    to="/png"
                    className={`dropdown-item ${
                      page === "/png" ? "current" : ""
                    }`}
                  >
                    To PNG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/remove-bg"
                    className={`dropdown-item ${
                      page === "/remove-bg" ? "current" : ""
                    }`}
                  >
                    Remove Bg
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  ["/png", "/remove-bg"].includes(page) ? "current" : ""
                }`}
                id="pngDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PDF Tools
              </button>
              <ul className="dropdown-menu" aria-labelledby="pdfDropdown">
                <li>
                  <Link
                    to="/pdf"
                    className={`dropdown-item ${
                      page === "/pdf" ? "current" : ""
                    }`}
                  >
                    Merge PDFs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-pdf"
                    className={`dropdown-item sign ${
                      page === "/sign-pdf" ? "current" : ""
                    }`}
                  >
                    Sign PDF
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                to="/ai-image"
                className={`swap ${
                  page === "/ai-image" ? "current" : ""
                } nav-link`}
              >
                AI Image Generator
              </Link>
            </li>
            <li style={{ margin: "auto", textAlign: "center" }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://buymeacoffee.com/leohoncana1"
              >
                <img
                  align="center"
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  height="50"
                  width="200"
                  alt="Donate us"
                  title="Donate us"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
