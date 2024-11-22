import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  const theme = localStorage.getItem("theme");
  return (
    <div className="about-us">
      <Helmet>
        <title>About SmartJPG - Your Image Optimization Experts</title>
        <link rel="canonical" href="https://www.smartjpg.com/about" />
        <meta
          name="description"
          content="Learn more about SmartJPG, our mission to provide top-notch image compression, conversion, and background removal tools tailored to your needs."
        />
      </Helmet>
      <h1>Simple. Secure. Smart.</h1>

      <div className="d-flex services-container">
        <div>
          <div style={{ height: "110px" }}>
            <img
              src="add-image.gif"
              alt="Add here"
              style={{ width: "100px", marginBottom: "10px" }}
              title="Drag & drop an image here"
            />
          </div>
          <h3 className={`service-text ${theme}`}>Covert to JPG</h3>
        </div>
        <div>
          <img
            src="add-png.gif"
            alt="Add here"
            style={{ width: "100px", marginBottom: "10px" }}
            title="Drag & drop an image here"
          />
          <h3 className={`service-text ${theme}`}>Covert to PNG</h3>
        </div>
        <div>
          <div style={{ height: "110px" }}>
            <img
              src="remove.gif"
              alt="Add here"
              style={{ width: "100px", marginBottom: "10px" }}
              title="Drag & drop an image here"
            />
            <h3 className={`service-text ${theme}`}>Remove Bg</h3>
          </div>
        </div>
        <div>
          <div style={{ height: "110px" }}>
            <img
              src="add-document.gif"
              alt="Upload PDF files for merging"
              style={{ width: "100px", marginBottom: "10px" }}
              title="Click to upload PDFs here"
            />
            <h3 className={`service-text ${theme}`}>Merge PDFs</h3>
          </div>
        </div>

        <div>
          <div style={{ height: "110px" }}>
            <img
              src="split.gif"
              alt="Upload PDF files for splitting"
              style={{ width: "100px", marginBottom: "10px" }}
              title="Click to upload PDF here"
            />
            <h3 className={`service-text ${theme}`}>Split PDF</h3>
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
