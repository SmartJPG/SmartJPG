import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";

const App = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [showDonate, setShowDonate] = useState(true);
  const [counting, setCounting] = useState(4);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://smartjpg-backend.onrender.com/convert",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Image conversion failed:", error);
      alert("Failed to convert the image.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "linear-gradient(#e66465, #9198e5)",
      }}
    >
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
      <h1
        style={{
          margin: "0px",
          fontSize: "3.5rem",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          fontWeight: "800",
        }}
      >
        SmartJPG
      </h1>
      <h4
        style={{
          color: "lightgray",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          fontWeight: "800",
        }}
      >
        Convert Image to JPEG for FREE
      </h4>

      <div
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
          type="file"
          accept="image/jpeg, image/png, image/webp, image/avif, image/heic"
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
        <button onClick={handleConvert} style={{ marginBottom: "20px" }}>
          Convert to JPEG
        </button>

        {preview && (
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              maxHeight: "300px",
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

        {downloadLink && (
          <div style={{ marginTop: "20px" }}>
            <a href={downloadLink} download="converted-image.jpg">
              Download JPEG
            </a>
          </div>
        )}
      </div>

      <footer style={{ width: "100%" }}>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            backgroundColor: "white",
            padding: "15px 40px",
            borderRadius: "40px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            color: "gray",
            fontWeight: "600",
          }}
        >
          © 2024 Copyright:SmartJPG.app
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
            maxWidth: "350px",
            width: "100%",
            bottom: "20px",
            right: "20px",
            borderRadius: "20px",
            backgroundColor: "white",
            textAlign: "center",
            padding: "20px 30px",
            zIndex: "2",
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
                top: "0px",
                right: "0px",
                fontWeight: "600",
                padding: "5px 10px",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              className="gradient-border"
            >
              <span>{counting}</span>
            </div>

            <h1>Please donate us!</h1>
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
