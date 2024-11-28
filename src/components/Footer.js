import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer
    className="text-center text-lg-start text-muted"
    style={{ maxWidth: "1500px" }}
  >
    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <div className="me-5 d-none d-lg-block">
        <span>Connect with us and contribute to our open-source repo:</span>
      </div>

      <div>
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
    </section>

    <section className="">
      <div className="square-container">
        <img src="square.png" alt="square background" />
      </div>
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <img
              src="SmartJPG.png"
              alt="SmartJPG"
              className="logo"
              style={{
                width: "80px",
                height: "80px",
                margin: "20px auto",
                marginTop: "0",
              }}
            />
            <p>
              SmartJPG is a free online tool for AI image generation, image
              conversion, background removal, and signing PDFs.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Tools</h6>
            <p>
              <a href="/" className="text-reset">
                JPG
              </a>
            </p>
            <p>
              <a href="/png" className="text-reset">
                PNG
              </a>
            </p>
            <p>
              <a href="/remove-bg" className="text-reset">
                Remove Background
              </a>
            </p>
            <p>
              <a href="/pdf" className="text-reset">
                PDF
              </a>
            </p>
            <p>
              <a href="/sign-pdf" className="text-reset">
                Sign PDF
              </a>
            </p>
            <p>
              <a href="/ai-image" className="text-reset">
                AI Image Generation
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Information</h6>
            <p>
              <a href="/about" className="text-reset">
                About us
              </a>
            </p>
            <p>
              <a href="/privacy" className="text-reset">
                Privacy Policy
              </a>
            </p>

            <p>
              <a href="/terms" className="text-reset">
                Terms of Service
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>Toronto, ON, Canada</p>
            <p>leohoncanada@gmail.com</p>
          </div>
        </div>
      </div>
    </section>

    <div
      className="text-center p-4"
      style={{ borderTop: "1px solid lightgrey" }}
    >
      <p className="copyright">© 2024 SmartJPG - All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
