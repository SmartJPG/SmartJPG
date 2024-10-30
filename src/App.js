import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

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
          borderRadius: "50%",
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
          // maxWidth: "500px",
          // width: "100%",
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
            // left: "50%",
            // transform: "translateX(-50%)",
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
    </div>
  );
};

export default App;
