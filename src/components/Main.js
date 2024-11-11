import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from "react-top-loading-bar";
import { saveAs } from "file-saver";
import Donate from "./Donate";
import Logo from "./Logo";
import Slogan from "./Slogan";
import { motion } from "framer-motion";
import PdfComp from "./PdfComp";
import SinglePdfComp from "./SinglePdfComp";

const { REACT_APP_API_URL } = process.env;

const PdfViewer = ({ pdfUrl }) => (
  <div>
    {pdfUrl ? (
      <PdfComp pdfFile={pdfUrl} />
    ) : (
      <img src="pdf.png" alt="pdf-logo" style={{ width: "100px" }} />
    )}
  </div>
);

const SortableItem = ({
  file,
  index,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}) => (
  <div
    className="pdf-file"
    draggable
    onDragStart={(e) => handleDragStart(e, index)}
    onDragEnter={(e) => handleDragEnter(e, index)}
    onDragEnd={handleDragEnd}
    style={{
      margin: "10px",
      zIndex: "100",
      cursor: "move",
    }}
  >
    {/* <img src="pdf.png" alt="PDF" style={{ width: "60px" }} /> */}

    <PdfViewer pdfUrl={URL.createObjectURL(file)} />

    {file.name.length < 15 ? (
      <p style={{ fontSize: "10px" }}>{file.name}</p>
    ) : (
      <p>{file.name.slice(0, 15) + "..."}</p>
    )}
  </div>
);

const SortableList = ({ items, setItems }) => {
  const [draggingItemIndex, setDraggingItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingItemIndex(index);
  };

  const handleDragEnter = (e, index) => {
    if (draggingItemIndex === index) return;

    const newList = [...items];
    const [draggedItem] = newList.splice(draggingItemIndex, 1);
    newList.splice(index, 0, draggedItem);

    setDraggingItemIndex(index);
    setItems(newList);
  };

  const handleDragEnd = () => {
    setDraggingItemIndex(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((file, index) => (
        <SortableItem
          key={index}
          file={file}
          index={index}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

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
  const [check, setCheck] = useState(false);

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

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewLoading(true);

      if (selectedFile.type === "image/heic") {
        try {
          const formData = new FormData();
          formData.append("image", selectedFile);

          const response = await axios.post(
            `${REACT_APP_API_URL}/convert`,
            formData,
            { responseType: "blob" }
          );

          if (preview) {
            URL.revokeObjectURL(preview);
          }

          const convertedBlob = new Blob([response.data], {
            type: "image/jpeg",
          });
          const previewUrl = URL.createObjectURL(convertedBlob);
          setPreview(previewUrl);
        } catch (error) {
          console.error("HEIC conversion failed:", error);
          alert("Failed to preview HEIC image.");
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }

      setTimeout(() => {
        setPreviewLoading(false);
      }, 1000);
    }
  };

  const handlePfFileSplitChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
      setPreviewLoading(true);

      if (droppedFile.type === "image/heic") {
        const formData = new FormData();
        formData.append("image", droppedFile);

        axios
          .post(`${REACT_APP_API_URL}/convert`, formData, {
            responseType: "blob",
          })
          .then((response) => {
            if (preview) {
              URL.revokeObjectURL(preview);
            }
            const convertedBlob = new Blob([response.data], {
              type: "image/jpeg",
            });
            const previewUrl = URL.createObjectURL(convertedBlob);
            setPreview(previewUrl);
          })
          .catch((error) => {
            console.error("HEIC conversion failed:", error);
            alert("Failed to preview HEIC image.");
          })
          .finally(() => setPreviewLoading(false));
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
          setPreview(reader.result);
        };
        reader.readAsDataURL(droppedFile);

        setTimeout(() => setPreviewLoading(false), 1000);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
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

      setCheck(true);

      setTimeout(() => {
        setCheck(false);
      }, 3000);
    } catch (error) {
      console.error("Image conversion failed:", error);
      alert("Failed to convert the image.");
      ref.current.complete();
    }
  };

  const handlePdfMerge = async () => {
    if (pdfFiles.length < 2) {
      alert("Please select at least two PDFs to merge.");
      return;
    }

    const formData = new FormData();
    pdfFiles.forEach((file) => formData.append("pdfs", file));

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

      saveAs(response.data, "smartpdf-merged.pdf");
      ref.current.complete();
    } catch (error) {
      console.error("PDF merging failed:", error);
      alert("Failed to merge PDFs.");
      ref.current.complete();
    }
  };

  const handleConvertToPng = async (e) => {
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
        `${REACT_APP_API_URL}/convert-to-png`,
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

      saveAs(response.data, "smartpng-converted-image.png");
      ref.current.complete();

      setCheck(true);

      setTimeout(() => {
        setCheck(false);
      }, 3000);
    } catch (error) {
      console.error("PNG conversion failed:", error);
      alert("Failed to convert the image.");
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
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (selectedFiles.length < 2) {
      alert("Please upload at least two PDFs to merge.");
      return;
    }

    console.log("Selected PDF files:", selectedFiles);
    setPdfFiles(selectedFiles);
  };

  const [splitPages, setSplitPages] = useState([]);

  const handleDeletePage = (index) => {
    setSplitPages((prevPages) => prevPages.filter((_, i) => i !== index));
  };

  const removeBg = async (e) => {
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
        `${REACT_APP_API_URL}/remove-bg`,
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

      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const resultUrl = URL.createObjectURL(response.data);
      setPreview(resultUrl);

      saveAs(response.data, "background-removed-image.png");

      ref.current.complete();
      setCheck(true);

      setTimeout(() => {
        setCheck(false);
      }, 3000);
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Reached the limit of free requests. Please try again later.");
      ref.current.complete();
    }
  };

  const handleMergePdf = async () => {
    if (splitPages.length < 2) {
      alert("Please select at least two pages to merge.");
      return;
    }

    const formData = new FormData();
    splitPages.forEach((page, index) => formData.append(`page-${index}`, page));

    try {
      ref.current.continuousStart();
      const response = await axios.post(
        `${REACT_APP_API_URL}/merge-pdfs`,
        formData,
        { responseType: "blob" }
      );
      saveAs(response.data, "merged.pdf");
      ref.current.complete();
    } catch (error) {
      console.error("PDF merging failed:", error);
      alert("Failed to merge PDFs.");
      ref.current.complete();
    }
  };

  return (
    <div className="main">
      {check ? (
        <div className="check-here-div">
          <img src="arrow.gif" alt="here!" className="arrow" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="donate-container"
          >
            {page === "jpg" && <h4 className="check-here">☝🏻 🎇</h4>}

            {page === "pdf" && <h4 className="check-here">☝🏻 📄📄</h4>}
          </motion.div>
        </div>
      ) : null}

      <LoadingBar
        ref={ref}
        color={loadingColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />

      {pdfFiles.length < 1 ? (
        <>
          <Logo />

          <Slogan />
        </>
      ) : null}

      {page === "pdf" && (
        <div
          className="input-container"
          onClick={pdfFiles.length < 1 ? handlePdfContainerClick : null}
          style={{
            position: "relative",
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
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

          {pdfFiles.length > 0 ? (
            <>
              <h4>Reorder PDFs</h4>
              <SortableList items={pdfFiles} setItems={setPdfFiles} />
              <button className="swap" onClick={handlePdfMerge}>
                Merge PDFs
              </button>
            </>
          ) : (
            <div>
              <img
                src="add-document.gif"
                alt="Upload PDF files for merging"
                style={{ width: "25%", marginBottom: "10px" }}
                title="Click to upload PDFs here"
              />
              <p className="drag-and-drop-text">Click to upload PDFs here 👋🏻</p>
              <h3 style={{ fontSize: "13px" }}>Files must be in PDF format</h3>
            </div>
          )}
        </div>
      )}

      {/* {page === "split" && (
        <div
          style={{
            position: "relative",
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
          onClick={!file ? handlePdfContainerClick : null}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePfFileSplitChange}
            ref={pdfFileInputRef}
            id="fileInput"
            style={{ margin: "10px 0", display: "none" }}
          />

          {file ? (
            <>
              <h4>Reorder PDFs</h4>
              <SortableList items={pdfFiles} setItems={setPdfFiles} />
            </>
          ) : (
            <div>
              <img
                src="split.gif"
                alt="Upload PDF files for merging"
                style={{ width: "25%", marginBottom: "10px" }}
                title="Click to upload PDFs here"
              />
              <p className="drag-and-drop-text">Click to upload PDF here 👋🏻</p>
              <h3 style={{ fontSize: "13px" }}>Files must be in PDF format</h3>
            </div>
          )}

          {file && (
            <div style={{ marginTop: "20px" }}>
              <div>
                <SinglePdfComp pdfFile={preview} />
              </div>
            </div>
          )}
        </div>
      )} */}

      {page === "jpg" && (
        <div
          className="input-container"
          onClick={handleContainerClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
        >
          <input
            ref={fileInputRef}
            id="fileInput"
            className="input"
            type="file"
            accept="image/jpeg, image/png, image/webp, image/avif, image/heic, image/svg"
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
                  title="Drag & drop an image here"
                />
                <p className="drag-and-drop-text">
                  Drag & drop an image here 👋🏻
                </p>
                <h3 style={{ fontSize: "13px", fontWeight: "default" }}>
                  Supported Formats: HEIC, JPEG, WEBP, AVIF, SVG
                </h3>
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
                    maxWidth: "350px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
      {page === "png" && (
        <div
          className="input-container"
          onClick={handleContainerClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
        >
          <input
            ref={fileInputRef}
            id="fileInput"
            className="input"
            type="file"
            accept="image/jpeg, image/png, image/webp, image/avif, image/heic, image/svg"
            onChange={handleFileChange}
            style={{ margin: "10px 0", display: "none" }}
          />

          <div>
            {fileLoaded ? (
              <button className="convert-btn" onClick={handleConvertToPng}>
                Convert to PNG
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
                  src="add-png.gif"
                  alt="Add here"
                  style={{ width: "25%", marginBottom: "10px" }}
                  title="Drag & drop an image here"
                />
                <p className="drag-and-drop-text">
                  Drag & drop an image here 👋🏻
                </p>
                <h3 style={{ fontSize: "13px", fontWeight: "default" }}>
                  Supported Formats: HEIC, JPEG, PNG, WEBP, AVIF, SVG
                </h3>
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
                    maxWidth: "350px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {page === "RM" && (
        <div
          className="input-container"
          onClick={handleContainerClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
          }}
        >
          <input
            ref={fileInputRef}
            id="fileInput"
            className="input"
            type="file"
            accept="image/jpeg, image/png, image/webp, image/avif, image/heic"
            onChange={handleFileChange}
            style={{ margin: "10px 0", display: "none" }}
          />

          <div>
            {fileLoaded ? (
              <button className="convert-btn" onClick={removeBg}>
                Remove Background
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
                  src="remove.gif"
                  alt="Add here"
                  style={{ width: "25%", marginBottom: "10px" }}
                  title="Drag & drop an image here"
                />
                <p className="drag-and-drop-text">
                  Drag & drop a PNG image here 👋🏻
                </p>
                <h3 style={{ fontSize: "13px", fontWeight: "default" }}>
                  Supported Formats: PNG
                </h3>
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
                    maxWidth: "350px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {showDonate && <Donate counting={counting} />}
    </div>
  );
};

export default Main;
