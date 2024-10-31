import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [blobData, setBlobData] = useState(null);
  const [showDonate, setShowDonate] = useState(true);
  const [counting, setCounting] = useState(4);
  const downloadAnchorRef = useRef(null);
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
    if (blobData && downloadAnchorRef.current) {
      const downloadUrl = URL.createObjectURL(blobData);
      downloadAnchorRef.current.href = downloadUrl;
      downloadAnchorRef.current.click();
      URL.revokeObjectURL(downloadUrl);
    }
  }, [blobData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleConvert = async () => {
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
        "https://smartjpg-backend.onrender.com/convert",
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

      setBlobData(response.data);

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
      <img
        src="SmartJPG.png"
        alt="Icon"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "30px",
          marginBottom: "20px",
        }}
      />
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
      <h4
        style={{
          color: "lightgray",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          fontWeight: "800",
          marginBottom: "10px",
        }}
      >
        Simple. Fast. Smart.
      </h4>

      <div
        className="input-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          borderRadius: "20px",
          padding: "25px 40px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1",
        }}
      >
        <input
          className="input"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/avif"
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
        <button className="convert-btn" onClick={handleConvert}>
          Convert to JPEG
        </button>

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

        {/* Hidden download link */}
        <div style={{ display: "none" }}>
          <a href="#" download="converted-image.jpg" ref={downloadAnchorRef}>
            Download JPEG
          </a>
        </div>
      </div>

      <footer>
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 40px",
            fontWeight: "600",
          }}
        >
          © 2024 Copyright: SmartJPG.app
        </div>
      </footer>

      {showDonate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="donate-container"
          style={{
            position: "absolute",
            maxWidth: "400px",
            width: "100%",
            bottom: "20px",
            right: "20px",
            borderRadius: "20px",
            backgroundColor: "white",
            textAlign: "center",
            padding: "30px 40px",
            zIndex: "2",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-35px",
                fontWeight: "600",
                padding: "5px 10px",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                width: "40px",
                height: "40px",
              }}
              className="gradient-border"
            >
              <span>{counting}</span>
            </div>

            <h1>Support us!</h1>
            <p>Your support can help us keep developing free resources.</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://buymeacoffee.com/leohoncana1"
            >
              <img
                align="center"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                height="50"
                width="210"
                alt="Donate us"
              />
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
