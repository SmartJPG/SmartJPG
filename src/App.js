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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Image Converter: Convert Image to JPEG for Free </h1>
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/avif"
        onChange={handleFileChange}
      />
      <button onClick={handleConvert} style={{ marginLeft: "10px" }}>
        Convert to JPEG
      </button>

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: "400px" }} />
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
  );
};

export default App;
