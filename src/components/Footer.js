import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer>
    <div
      style={{
        fontWeight: "600",
        width: "100%",
        color: "white",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginTop: "10px" }}>
        <a className="about-link" href="/about">
          About Us
        </a>
        <a className="about-link" href="/privacy">
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
