import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";

const Connect = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/b0f4f643-601a-42d4-9a4e-fd7e3ea9dda2/wKQB4jRk6H.lottie"
      loop
      autoplay
    />
  );
};

const Box = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/82af52a1-4ed3-4024-8549-59b00caaac48/Oknd6yAYfZ.lottie"
      loop
      autoplay
    />
  );
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      mirror: false,
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="Home">
        <Helmet>
          <title>SmartJPG - AI-Powered Converting Tools</title>
          <link rel="canonical" href="https://www.smartjpg.app/" />
          <meta
            name="description"
            content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
          />
        </Helmet>

        <div className="row col-12">
          <div className="col-12 col-md-6 text-left">
            <div className="hero">
              <h1>AI-Powered</h1>
              <h1>Converting Tools</h1>
              <br />
              <p className="hero-des">
                Free online tool to help you convert, compress, and remove
                backgrounds from your images. Our tools are designed to help you
                save time and resources, so you can focus on what matters most.
              </p>
              <br />

              <button
                className="try-btn"
                onClick={() => (window.location.href = "/smartify")}
              >
                Try Smartify AI
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="hero right">
              <div>
                <img
                  src="SmartJPG.png"
                  alt="Icon"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <br />
              <div className="services">
                <div className="service jpg">
                  <img src="./doc.png" alt="file" className="icon doc" />
                  .jpg Converter
                </div>
                <div className="service png">
                  <img src="./doc.png" alt="file" className="icon doc" />
                  .png Converter
                </div>

                <div className="service rm">
                  <img src="./doc.png" alt="file" className="icon doc" />
                  Remove Background
                </div>
                {/* <div
                  className="service pdf"
                  onClick={() => (window.location.href = "/pdf")}
                >
                  <img src="./pdf.png" alt="file" className="icon" />
                  Merge PDFs
                  <div className="arrow-container">
                    <svg
                      className="arrow-right"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M22.56 16.94l-5.51-5.5a1.49 1.49 0 0 0-2.12 2.12l4.44 4.44-4.44 4.44a1.49 1.49 0 1 0 2.12 2.12l5.51-5.5c.28-.28.44-.66.44-1.06s-.16-.78-.44-1.06z" />
                    </svg>
                  </div>
                </div>
                <div
                  className="service sign"
                  onClick={() => (window.location.href = "/sign-pdf")}
                >
                  <img src="./pdf.png" alt="file" className="icon" />
                  Sign PDF
                  <div className="arrow-container">
                    <svg
                      className="arrow-right"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M22.56 16.94l-5.51-5.5a1.49 1.49 0 0 0-2.12 2.12l4.44 4.44-4.44 4.44a1.49 1.49 0 1 0 2.12 2.12l5.51-5.5c.28-.28.44-.66.44-1.06s-.16-.78-.44-1.06z" />
                    </svg>
                  </div>
                </div> */}
                <div className="service ai">AI Generated Image</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="illustion">
          <div className="row slogan" data-aos="fade-up">
            <div className="col-12 col-md-6">
              <h2 style={{ textAlign: "left" }}>Connect,</h2>
              <h2 style={{ textAlign: "left" }}>Deliver Image Tools.</h2>
              <br />
              <p style={{ textAlign: "left" }}>
                SmartJPG centralize image tools and make it simple,
                user-friendly. So you can find your wants and needs here.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <Connect />
            </div>
          </div>

          <br />
          <br />

          <div className="row slogan" data-aos="fade-up">
            <div className="col-12 col-md-6">
              <h2 style={{ textAlign: "left" }}>Build,</h2>
              <h2 style={{ textAlign: "left" }}>Merge, Create.</h2>
              <br />
              <p style={{ textAlign: "left" }}>
                SmartJPG is a free AI-powered image converting tool that allows
                you to convert images to JPG/PNG format, and remove image
                backgrounds digitally.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <Box />
            </div>
          </div>

          <br />
          <br />
          {/* <div className="table-container">
            <h2>Why SmartJPG?</h2>
            <br />

            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>SmartJPG</th>
                  <th>Other Online tools</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Usage & Limitations</td>
                  <td>
                    Unlimited usage, no watermarks, no sign-ups, no file size
                    limit.
                  </td>
                  <td>
                    Other tools have file size limitations or restricted
                    features in free versions.
                  </td>
                </tr>
                <tr>
                  <td>Sign-Up Requirement</td>
                  <td>No sign-up required.</td>
                  <td>Require registration for full functionality.</td>
                </tr>
              </tbody>
            </table>
          </div> */}

          <br />
          <br />

          <div>
            <div className="question-container">
              <h4>Still have questions?</h4>
              <p>
                Can't find the answer you're looking for? Please find our
                friendly team.
              </p>
              <button
                className="contact-btn"
                onClick={() =>
                  (window.location.href = "mailto:leohoncanada@gmail.com")
                }
              >
                Contact us
              </button>
            </div>
          </div>

          {/* happening now. */}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
