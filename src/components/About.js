import React from "react";
import { Helmet } from "react-helmet";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const JPG = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/0769f4e1-df15-498a-99af-00fb60a60c39/qt9XGtqX0e.lottie"
      loop
      autoplay
      style={{ margin: "auto" }}
    />
  );
};

const AI = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/41025657-829d-4653-9b43-d2d976a17236/8S7xCManYf.lottie"
      loop
      autoplay
      style={{ width: "250px" }}
    />
  );
};

const PNG = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/50fb4c47-15cb-4534-a2da-94f1285f6681/ruH4Ynpa82.lottie"
      loop
      autoplay
      style={{ width: "300px", margin: "auto" }}
    />
  );
};

const PDF = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/b5126674-204a-452f-aa5c-8464d75b0d10/p89IHgP2z9.lottie"
      loop
      autoplay
      style={{ width: "230px", margin: "auto" }}
    />
  );
};

const Remove = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/8ca58875-60bc-4f55-943f-8ec0af3cffdf/4yleSubbm8.lottie"
      loop
      autoplay
      style={{ width: "300px", margin: "auto" }}
    />
  );
};

const Sign = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/d998a890-8cc5-4654-95b5-180a91823250/9B7AS2nPMF.lottie"
      loop
      autoplay
      style={{ width: "300px", margin: "auto" }}
    />
  );
};

const About = () => {
  const theme = localStorage.getItem("theme");
  return (
    <div className="about-us">
      <Helmet>
        <title>About SmartJPG - Your Image Optimization Experts</title>
        <link rel="canonical" href="https://www.smartjpg.app/about" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <h1>Simple. Secure. Smart.</h1>

      <div className="d-flex services-container">
        <div>
          <div style={{ height: "110px" }}>
            <JPG />
          </div>
          <h3 className={`service-text ${theme}`}>Covert to JPG</h3>
        </div>
        <div>
          <div style={{ height: "110px" }}>
            <PNG />
          </div>
          <h3 className={`service-text ${theme}`}>Covert to PNG</h3>
        </div>
        <div>
          <div style={{ height: "110px" }}>
            <Remove />
            <h3 className={`service-text ${theme}`}>Remove Bg</h3>
          </div>
        </div>
        <div>
          <div style={{ height: "110px" }}>
            <PDF />
            <h3 className={`service-text ${theme}`}>Merge PDFs</h3>
          </div>
        </div>

        <div>
          <div style={{ height: "110px" }}>
            <Sign />
            <h3 className={`service-text ${theme}`}>Sign PDF</h3>
          </div>
        </div>
      </div>

      <button className="back" onClick={() => (window.location.href = "/")}>
        {" "}
        Go back{" "}
      </button>
    </div>
  );
};

export default About;
