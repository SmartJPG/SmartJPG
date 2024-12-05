import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const location = useLocation();
  const page = location.pathname;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("theme", "pro");
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownClose = (e) => {
    const dropdown = e.target.closest(".dropdown");
    if (dropdown) {
      const toggle = dropdown.querySelector(".dropdown-toggle");
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      if (toggle && dropdownMenu) {
        dropdownMenu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        {!isScrolled ? (
          <Link className="navbar-brand" to="/">
            <img
              src="SmartJPG.png"
              alt="Icon"
              style={{
                width: "25px",
                marginRight: "0.25rem",
                marginBottom: "0.35rem",
              }}
            />
            SmartJPG
          </Link>
        ) : (
          <img
            src="SmartJPG.png"
            alt="Icon"
            style={{ width: "50px", height: "50px" }}
          />
        )}

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
                to="/jpg"
                className={`swap ${page === "/jpg" ? "current" : ""} nav-link`}
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
                PNG Tools
              </button>

              <ul className="dropdown-menu" aria-labelledby="pngDropdown">
                <li>
                  <Link
                    to="/png"
                    className={`dropdown-item ${
                      page === "/png" ? "current" : ""
                    }`}
                    onClick={handleDropdownClose}
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
                    onClick={handleDropdownClose}
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
                id="pdfDropdown"
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
                    onClick={handleDropdownClose}
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
                    onClick={handleDropdownClose}
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
                Image Generator
              </Link>
            </li>
            <li className="nav-item coffee">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://buymeacoffee.com/leohoncana1"
              >
                {isScrolled ? (
                  <img
                    align="center"
                    src="coffee.png"
                    height="40"
                    alt="Donate us"
                    title="Donate us"
                    style={{ borderRadius: "10px" }}
                  />
                ) : (
                  <img
                    align="center"
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                    height="40"
                    width="170"
                    alt="Donate us"
                    title="Donate us"
                  />
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
