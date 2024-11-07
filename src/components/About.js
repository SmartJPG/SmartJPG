import React from "react";

const About = () => {
  const theme = localStorage.getItem("theme");
  return (
    <div className="about-us">
      <h2>Simple. Secure. Smart.</h2>

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
      </div>

      <button className="back" onClick={() => (window.location.href = "/")}>
        {" "}
        Go back{" "}
      </button>
    </div>
  );
};

export default About;
