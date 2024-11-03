import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from "react-top-loading-bar";
import Footer from "./Footer";
import { saveAs } from "file-saver";
import Donate from "./Donate";
import Logo from "./Logo";
import Slogan from "./Slogan";
const { REACT_APP_API_URL } = process.env;

const Main = ({ page }) => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
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
      setPreviewLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);

        setTimeout(() => {
          setPreviewLoading(false);
        }, 1000);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    if (droppedFile) {
      setPreviewLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        // setPreviewLoading(false);
        setTimeout(() => {
          setPreviewLoading(false);
        }, 1000);
      };
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

  const handlePdfMerge = async () => {
    if (pdfFiles.length < 2) {
      alert("Please upload at least two PDFs to merge.");
      return;
    }

    const formData = new FormData();
    pdfFiles.forEach((file) => formData.append("pdfs", file));

    setLoadingColor(getRandomColor());

    try {
      ref.current.continuousStart();

      const response = await axios.post(
        `${REACT_APP_API_URL}/merge-pdfs`,
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

      saveAs(response.data, "merged.pdf");
      ref.current.complete();
    } catch (error) {
      console.error("PDF merging failed:", error);
      alert("Failed to merge PDFs.");
      ref.current.complete();
    }
  };

  const fileInputRef = useRef(null);
  const pdfFileInputRef = useRef(null);

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handlePdfContainerClick = () => {
    pdfFileInputRef.current.click();
  };

  const handlePdfFilesChange = (e) => {
    setPdfFiles(Array.from(e.target.files));

    handlePdfMerge();
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
        <span>Smart</span>
        <span>{page.toUpperCase()}</span>
      </h2>

      <Slogan />

      {page === "jpg" && (
        <div>
          <button
            className="swap"
            onClick={() => (window.location.href = "/pdf")}
          >
            Merge PDFs 📄
          </button>
        </div>
      )}

      {page === "pdf" && (
        <div>
          <button className="swap" onClick={() => (window.location.href = "/")}>
            Convert to JPG 🎇
          </button>
        </div>
      )}

      {page === "pdf" && (
        <div
          className="input-container"
          onClick={handlePdfContainerClick}
          style={{
            maxWidth: "350px",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "1",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
        >
          <input
            type="file"
            ref={pdfFileInputRef}
            id="fileInput"
            accept="application/pdf"
            multiple
            onChange={handlePdfFilesChange}
            style={{ margin: "10px 0", display: "none" }}
          />

          <div>
            <img
              src="add-image.gif"
              alt="Add here"
              style={{ width: "25%", marginBottom: "10px" }}
            />
            <h3>Drag & drop PDFs here 👋🏻</h3>
            <span style={{ fontSize: "13px" }}>
              Files must be in PDF format
            </span>
          </div>
          {/* <button onClick={handlePdfMerge}>Merge PDFs</button> */}
        </div>
      )}

      {page === "jpg" && (
        <div
          className="input-container"
          onClick={handleContainerClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            maxWidth: "350px",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "1",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
        >
          <input
            ref={fileInputRef}
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
                Convert to JPG
                <span>
                  <svg
                    className="icon-control icon-control-chevronright"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    aria-hidden="true"
                    role="img"
                  >
                    <path d="M22.56 16.94l-5.51-5.5a1.49 1.49 0 0 0-2.12 2.12l4.44 4.44-4.44 4.44a1.49 1.49 0 1 0 2.12 2.12l5.51-5.5c.28-.28.44-.66.44-1.06s-.16-.78-.44-1.06z" />
                  </svg>
                </span>
              </button>
            ) : (
              <div>
                <img
                  src="add-image.gif"
                  alt="Add here"
                  style={{ width: "25%", marginBottom: "10px" }}
                />
                <h3>Drag & drop an image here 👋🏻</h3>
                <span style={{ fontSize: "13px" }}>
                  File must be JPEG, PNG, WEBP, or AVIF
                </span>
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
                borderRadius: "20px",
                backgroundColor: "#fff",
                position: "relative",
                minHeight: "200px",
              }}
            >
              {previewLoading ? (
                <div>
                  <img
                    src="loading.gif"
                    alt="Loading"
                    style={{
                      marginBottom: "10px",
                    }}
                  />
                  <p>Loading, please wait...</p>
                </div>
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      <Footer />
      {showDonate && <Donate counting={counting} />}
    </div>
  );
};

export default Main;
