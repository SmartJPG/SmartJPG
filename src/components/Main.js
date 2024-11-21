import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from "react-top-loading-bar";
import { saveAs } from "file-saver";
import Slogan from "./Slogan";
import PdfComp from "./PdfComp";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const { REACT_APP_API_URL } = process.env;

const JPG = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/edadbe4e-d2c4-4a9d-8a8c-e51c9ec7841d/87sdIWA1Ji.lottie"
      loop
      autoplay
      style={{ width: "230px", margin: "auto" }}
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

const Generating = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/de57f3f0-0321-4c9c-b763-53b4dcf260f3/cylbDB6Jt5.lottie"
      loop
      autoplay
      style={{ width: "300px" }}
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

const PdfViewer = ({ pdfUrl }) => (
  <div>
    {pdfUrl ? (
      <PdfComp pdfFile={pdfUrl} />
    ) : (
      <img src="pdf.png" alt="pdf-logo" style={{ width: "100px" }} />
    )}
  </div>
);

const Loading = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/3cee3565-689b-44df-a329-d04cb0da4f8c/M39SVlV3es.lottie"
      loop
      autoplay
      style={{ width: "300px", margin: "auto" }}
    />
  );
};

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
    <PdfViewer pdfUrl={useMemo(() => URL.createObjectURL(file), [file])} />

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
  const [progress, setProgress] = useState(0);
  const [loadingColor, setLoadingColor] = useState("#f11946");
  const [inputPrompt, setInputPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (file) {
      setFileLoaded(true);
    } else {
      setFileLoaded(false);
    }
  }, [file]);

  useEffect(() => {
    if (prompt) {
      setLoadingImage(true);
    }
  }, [prompt]);

  useEffect(() => {
    if (imageUrl) {
      setLoadingImage(false);
    }
  }, [imageUrl]);

  const handlePromptChange = (e) => {
    setInputPrompt(e.target.value);
  };

  const handleSearch = async () => {
    setPrompt(inputPrompt);
    setLoadingImage(true);

    try {
      const response = await axios.get(
        `https://image.pollinations.ai/prompt/${inputPrompt}`,
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectURL);
      } else {
        console.error("Failed to fetch the image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoadingImage(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let interval;
    let index = 0;

    let targetText = "";
    if (page === "ai-image") {
      targetText = "AAI Image Generator";
    } else if (page === "chat") {
      targetText = "CChat with AI";
    }

    if (targetText) {
      setDisplayText("");
      interval = setInterval(() => {
        setDisplayText((prevText) => prevText + targetText[index]);
        index++;

        if (index >= targetText.length - 1) {
          clearInterval(interval);
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [page]);

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
    } catch (error) {
      console.error("Image conversion failed:", error);
      alert("Failed to convert the image.");
      ref.current.complete();
    }
  };

  const [fileName, setFileName] = useState("SmartJPG-merged");

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

      saveAs(response.data, fileName + ".pdf");
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

    setPdfFiles(selectedFiles);
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
    setPreviewLoading(true);

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
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Reached the limit of free requests. Please try again later.");
      ref.current.complete();
    } finally {
      setPreviewLoading(false);
      ref.current.complete();
    }
  };

  return (
    <div className="main">
      <LoadingBar
        ref={ref}
        color={loadingColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />

      {pdfFiles.length < 1 ? (
        <>
          {/* <Logo /> */}

          <img
            src="SmartJPG.png"
            alt="SmartJPG"
            className="logo"
            style={{ width: "80px", height: "80px" }}
          />

          {page === "ai-image" || page === "chat" ? (
            <h1 className="slogan ai-text slogan-item">{displayText}</h1>
          ) : (
            <Slogan />
          )}
        </>
      ) : null}

      {page === "pdf" && (
        <div
          className="input-container"
          onClick={pdfFiles.length < 1 ? handlePdfContainerClick : null}
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
            margin: "auto",
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
              <input
                className="file-name-input"
                type="text"
                placeholder="File name: SmartJPG-merged.pdf"
                onChange={(e) => setFileName(e.target.value)}
              />
              <button className="swap download-pdf" onClick={handlePdfMerge}>
                Merge PDFs
              </button>
            </>
          ) : (
            <div>
              <PDF />
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
            width: "50%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
            margin: "auto",
          }}
        >
          <input
            ref={fileInputRef}
            id="fileInput"
            className="input"
            type="file"
            accept="image/jpeg, image/png, image/webp, image/avif, image/heic, image/svg, image/gif"
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
                <JPG />
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
                  <Loading />
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
            width: "50%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
            margin: "auto",
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
                <PNG />
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
                  <Loading />
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
            width: "50%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: "5",
            cursor: "pointer",
            border: "2px dashed grey",
            margin: "auto",
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
                <Remove />
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
                  <Loading />
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

      {page === "ai-image" && (
        <div
          className="input-container ai-image"
          style={{
            width: "50%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            zIndex: "5",
            margin: "auto",
          }}
        >
          <input
            className="input-ai"
            type="text"
            placeholder="Enter a prompt"
            value={inputPrompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />

          {!imageUrl && !loadingImage && (
            <div>
              <AI />
            </div>
          )}

          {loadingImage ? (
            <div>
              <Generating />
              <p>Generating image...</p>
            </div>
          ) : (
            imageUrl && (
              <img
                src={imageUrl}
                alt="AI Generated"
                style={{ maxWidth: "300px", borderRadius: "20px" }}
              />
            )
          )}
        </div>
      )}

      {page === "chat" && (
        <div>
          <input
            className="input-ai"
            type="text"
            placeholder="Enter your message"
            style={{ width: "70%" }}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
