import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  // <footer>
  //   <div
  //     style={{
  //       fontWeight: "600",
  //       width: "100%",
  //       color: "white",
  //       borderTop: "1px solid grey",
  //       maxWidth: "1400px",
  //       margin: "0 auto",
  //     }}
  //   >
  //     <img
  //       src="SmartJPG.png"
  //       alt="SmartJPG"
  //       className="logo"
  //       style={{ width: "80px", height: "80px", margin: "20px" }}
  //     />
  //     <div>
  //       <a className="about-link" href="/about">
  //         About Us
  //       </a>
  //       <a className="about-link" href="/privacy">
  //         Privacy Policy
  //       </a>
  //       <a
  //         className="github-icon"
  //         href="https://github.com/SmartJPG/SmartJPG"
  //         target="_blank"
  //         rel="noreferrer"
  //         style={{ color: "white" }}
  //       >
  //         <FontAwesomeIcon icon={faGithub} size="2xl" />
  //       </a>
  //     </div>
  //     <p className="copyright">© 2024 SmartJPG - All rights reserved.</p>
  //   </div>
  // </footer>

  <footer class="text-center text-lg-start text-muted">
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <div class="me-5 d-none d-lg-block">
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

    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <img
              src="SmartJPG.png"
              alt="SmartJPG"
              className="logo"
              style={{
                width: "80px",
                height: "80px",
                margin: "20px auto",
              }}
            />
            <p>
              SmartJPG is a free online tool for AI image generation, image
              conversion, background removal, and signing PDFs.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Tools</h6>
            <p>
              <a href="/" class="text-reset">
                JPG
              </a>
            </p>
            <p>
              <a href="/png" class="text-reset">
                PNG
              </a>
            </p>
            <p>
              <a href="/remove-bg" class="text-reset">
                Remove Background
              </a>
            </p>
            <p>
              <a href="/pdf" class="text-reset">
                PDF
              </a>
            </p>
            <p>
              <a href="/sign-pdf" class="text-reset">
                Sign PDF
              </a>
            </p>
            <p>
              <a href="/ai-image" class="text-reset">
                AI Image Generation
              </a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Information</h6>
            <p>
              <a href="/about" class="text-reset">
                About us
              </a>
            </p>
            <p>
              <a href="/privacy" class="text-reset">
                Privacy Policy
              </a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i class="fas fa-home me-3"></i> Toronto, ON, Canada
            </p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              leohoncanada@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="text-center p-4" style={{ borderTop: "1px solid lightgrey" }}>
      <p className="copyright">© 2024 SmartJPG - All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
