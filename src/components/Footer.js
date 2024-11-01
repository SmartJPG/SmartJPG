import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        fontWeight: "600",
        width: "100%",
        color: "white",
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

      <p className="copyright">© 2024 SmartJPG - All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
