import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer>
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        fontWeight: "600",
        width: "90%",
        color: "white",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* <div className="info-box row">
        <div className="col-4">
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
        </div>
        <div className="col-4">
          <Link
            to="/privacy-policy"
            style={{ color: "white", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
        </div>
        <div className="col-4">
          <Link
            to="/terms-of-service"
            style={{ color: "white", textDecoration: "none" }}
          >
            Terms of Service
          </Link>
        </div>
      </div> */}
      <div style={{ marginTop: "10px" }}>
        <a class="about-link" href="/about">
          About Us
        </a>
        <a class="about-link" href="/privacy">
          Privacy Policy
        </a>
        <a
          className="github-icon"
          href="https://github.com/SmartJPG/SmartJPG"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          <FontAwesomeIcon icon={faGithub} size="2xl" />
        </a>
      </div>
      <p className="copyright">© 2024 SmartJPG - All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
