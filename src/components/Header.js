import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Theme from "./Theme";

const Header = () => {
  const location = useLocation();
  const page = location.pathname;

  useEffect(() => {
    localStorage.setItem("page", page);
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
            <li className="nav-item">
              <Link
                to="/png"
                className={`swap ${page === "/png" ? "current" : ""} nav-link`}
              >
                To PNG
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/remove-bg"
                className={`swap ${
                  page === "/remove-bg" ? "current" : ""
                } nav-link`}
              >
                Remove Bg
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pdf"
                className={`swap ${page === "/pdf" ? "current" : ""} nav-link`}
              >
                Merge PDFs
              </Link>
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
            <Theme />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
