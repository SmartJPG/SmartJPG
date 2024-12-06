import React, { useEffect } from "react";
// import Main from "./Main";
import { Helmet } from "react-helmet";
// import Description from "./Description";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <div className="Home">
        <Helmet>
          <title>
            SmartJPG - Free Image Converter, Background Remover, & PNG Converter
          </title>
          <link rel="canonical" href="https://www.smartjpg.app/" />
          <meta
            name="description"
            content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
          />
        </Helmet>

        <div className="row col-12">
          <div className="col-12 col-md-6 text-left">
            <div className="hero">
              <h1>Free</h1>
              <h1>Unlimited</h1>
              <h1>Digital Tools</h1>
              <br />
              <p className="hero-des">
                Free online tool to help you convert, compress, and remove
                backgrounds from your images. Our tools are designed to help you
                save time and resources, so you can focus on what matters most.
              </p>
              <br />

              <button
                className="try-btn"
                onClick={() => (window.location.href = "/jpg")}
              >
                Try SmartJPG for free
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
                <div
                  className="service jpg"
                  onClick={() => (window.location.href = "/jpg")}
                >
                  <img src="./doc.png" alt="file" className="icon doc" />
                  .jpg Converter
                </div>
                <div
                  className="service png"
                  onClick={() => (window.location.href = "/png")}
                >
                  <img src="./doc.png" alt="file" className="icon doc" />
                  .png Converter
                </div>
                <div
                  className="service rm"
                  onClick={() => (window.location.href = "/remove-bg")}
                >
                  <img src="./doc.png" alt="file" className="icon doc" />
                  Remove Background
                </div>
                <div
                  className="service pdf"
                  onClick={() => (window.location.href = "/pdf")}
                >
                  <img src="./pdf.png" alt="file" className="icon" />
                  Merge PDFs
                </div>
                <div
                  className="service sign"
                  onClick={() => (window.location.href = "/sign-pdf")}
                >
                  <img src="./pdf.png" alt="file" className="icon" />
                  Sign PDF
                </div>
                <div
                  className="service ai"
                  onClick={() => (window.location.href = "/ai-image")}
                >
                  AI Image
                </div>
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
                SmartJPG is a free online image tool that allows you to convert
                images to JPG format, merge PDF files, remove image backgrounds,
                and sign PDF documents digitally.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <Box />
            </div>
          </div>

          <br />
          <br />
          <div className="table-container">
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
                    Other converter tools may have file size limitations or
                    restricted features in free versions. It allows free
                    conversions with limitations and offers premium plans for
                    extended features.
                  </td>
                </tr>
                <tr>
                  <td>Sign-Up Requirement</td>
                  <td>
                    No sign-up required; users can access all features directly.
                  </td>
                  <td>
                    Other converter tools may require registration for full
                    functionality.
                  </td>
                </tr>
                <tr>
                  <td>Functions Offered</td>
                  <td>
                    Provides AI image generation, image format conversion,
                    background removal, and PDF merging/signing.
                  </td>
                  <td>
                    Other converter tools may offer limited functions or focus
                    on specific conversions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
