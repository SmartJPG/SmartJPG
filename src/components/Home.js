import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./../App.css";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from "react-top-loading-bar";
import Footer from "./Footer";
import { saveAs } from "file-saver";
import Donate from "./Donate";
import Logo from "./Logo";
const { REACT_APP_API_URL } = process.env;

const Home = () => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showDonate, setShowDonate] = useState(true);
  const [counting, setCounting] = useState(4);
  const [progress, setProgress] = useState(0);
  const [loadingColor, setLoadingColor] = useState("#f11946");

  useEffect(() => {
    if (counting > 0) {
      const timer = setTimeout(() => {
        setCounting((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowDonate(false);
    }
  }, [counting]);

  useEffect(() => {
    if (file) {
      setFileLoaded(true);
    } else {
      setFileLoaded(false);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    if (droppedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleConvert = async (e) => {
    e.stopPropagation();

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoadingColor(getRandomColor());

    try {
      ref.current.continuousStart();

      const response = await axios.post(
        `${REACT_APP_API_URL}/convert`,
        formData,
        {
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 50) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              50 + (progressEvent.loaded * 50) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      saveAs(response.data, "smartjpg-converted-image.jpg");

      ref.current.complete();
    } catch (error) {
      console.error("Image conversion failed:", error);
      alert("Failed to convert the image.");
      ref.current.complete();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "linear-gradient(#e66465, #9198e5)",
      }}
    >
      <LoadingBar
        ref={ref}
        color={loadingColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />
      <Logo />
      <h2
        style={{
          margin: "0px",
          fontSize: "3.5rem",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          fontWeight: "800",
        }}
      >
        SmartJPG
      </h2>
      <div className="slogan">
        <div className="slogan-item">
          <span>Simple. </span>
        </div>
        <div className="slogan-item">
          <span>Secure. </span>
        </div>
        <div className="slogan-item highlight-text-container">
          <span>Smart. </span>
          <span className="highlight"></span>
        </div>
      </div>
      <div
        className="input-container"
        onClick={() => document.getElementById("fileInput").click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          maxWidth: "350px",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          borderRadius: "20px",
          padding: "40px 40px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1",
          cursor: "pointer",
        }}
      >
        <input
          id="fileInput"
          className="input"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/avif"
          onChange={handleFileChange}
          style={{ margin: "10px 0", display: "none" }}
        />

        <div>
          {fileLoaded ? (
            <button className="convert-btn" onClick={handleConvert}>
              Convert to JPEG
            </button>
          ) : (
            <div>
              <img
                src="add-image.gif"
                alt="Add here"
                style={{ width: "25%", marginBottom: "10px" }}
              />
              <h3>Drag & drop an image here 👋🏻</h3>
              <span>File must be JPEG, PNG, WEBP and AVIF</span>
            </div>
          )}
        </div>

        {preview && (
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
      <Footer />
      {showDonate && <Donate counting={counting} />}
    </div>
  );
};

export default Home;
