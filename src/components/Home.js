import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import Faq from "react-faq-component";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      mirror: false,
    });
  }, []);

  const data = {
    rows: [
      {
        title: "1. Streamline Your Workflow",
        content:
          "Combine all image conversion and PDF tasks into one intuitive platform, eliminating the need for multiple tools and websites.",
      },
      {
        title: "2. Easy and Fast Image Conversion",
        content:
          "Convert images to various formats (JPG and PNG) quickly and effortlessly with a user-friendly interface.",
      },
      {
        title: "3. Secure and Privacy-Focused",
        content:
          "All uploaded files are processed securely, and no data is stored after the task is completed.",
      },
    ],
  };

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
                Try Smartify AI{" "}
                <img
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    marginLeft: "5px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
                  }}
                  src="/ffflux.svg"
                  alt="Smartify AI"
                />
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
                <div className="service jpg">.jpg Converter</div>
                <div className="service png">.png Converter</div>

                <div className="service rm">Remove Background</div>

                <div className="service ai">AI Generated Image</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="illustion">
          <div className="slogan" data-aos="fade-up">
            <div className="row">
              <div className="col-md-6 col-12 illustion-des">
                <div>
                  <h2 style={{ textAlign: "left" }}>Ask,</h2>
                  <h2 style={{ textAlign: "left" }}>We do it for you.</h2>
                  <br />
                  <Faq data={data} />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <video
                  width="100%"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ borderRadius: "20px" }}
                >
                  <source src="demo.mp4" type="video/mp4" height="433px" />
                </video>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="slogan second">
            <br />
            <br />
            <div className="row">
              <div className="col-md-6 col-12 illustion-des">
                <div>
                  <h2>
                    SmartJPG<span className="smartify-text">.ai</span> is moving
                    beyond traditional methods.
                  </h2>
                  <br />
                  <p>
                    Our AI-powered tools are designed to help you save time and
                    resources. We are committed to providing top-notch image
                    conversion, compression, and background removal tools
                    tailored to your needs.
                  </p>
                  <br />
                </div>
              </div>

              <div className="col-md-6 col-12 graphic">
                <div className="smartify-ai-graphic-div">
                  <img
                    className="smartify-ai-graphic"
                    src="./ffflux.svg"
                    alt="Smartify AI"
                  />
                </div>

                <div className="col-12 row">
                  <div className="col-6 square right">
                    <div className="one">
                      <p className="one-text">Images Conversion</p>
                    </div>
                  </div>
                  <div className="col-6 square">
                    <div className="two"></div>
                  </div>
                </div>
                <div className="col-12 row">
                  <div className="col-6 square">
                    <div className="three"></div>
                  </div>
                  <div className="col-6 square left">
                    <div className="four">
                      <p className="one-text">Smartify AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="question-section">
            <div className="question-container">
              <h1>Still have questions?</h1>
              <p>
                Can't find the answer you're looking for? Please find our
                friendly team.
              </p>
              <button
                className="contact-btn"
                onClick={() =>
                  (window.location.href = "mailto:info@smartjpg.app")
                }
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <Footer />
    </div>
  );
};

export default Home;
