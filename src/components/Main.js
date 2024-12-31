import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PdfComp from "./PdfComp";
import JSZip from "jszip";
import heic2any from "heic2any";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { saveAs } from "file-saver";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

const { REACT_APP_API_URL, REACT_APP_OPENAI_API_KEY } = process.env;

// const JPG = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/0769f4e1-df15-498a-99af-00fb60a60c39/qt9XGtqX0e.lottie"
//       loop
//       autoplay
//       style={{ margin: "auto" }}
//     />
//   );
// };

// const AI = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/41025657-829d-4653-9b43-d2d976a17236/8S7xCManYf.lottie"
//       loop
//       autoplay
//       style={{ width: "250px" }}
//     />
//   );
// };

const Generating = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/de57f3f0-0321-4c9c-b763-53b4dcf260f3/cylbDB6Jt5.lottie"
      loop
      autoplay
      style={{ width: "100%", maxWidth: "300px" }}
    />
  );
};

// const PNG = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/50fb4c47-15cb-4534-a2da-94f1285f6681/ruH4Ynpa82.lottie"
//       loop
//       autoplay
//       style={{ margin: "auto" }}
//     />
//   );
// };

const PDF = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/b5126674-204a-452f-aa5c-8464d75b0d10/p89IHgP2z9.lottie"
      loop
      autoplay
      style={{ margin: "auto", width: "50%" }}
    />
  );
};

// const Remove = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/8ca58875-60bc-4f55-943f-8ec0af3cffdf/4yleSubbm8.lottie"
//       loop
//       autoplay
//       style={{ margin: "auto" }}
//     />
//   );
// };

const PdfViewer = ({ pdfUrl }) => (
  <div>
    {pdfUrl ? (
      <PdfComp pdfFile={pdfUrl} />
    ) : (
      <img src="pdf.png" alt="pdf-logo" style={{ width: "100px" }} />
    )}
  </div>
);

// const Loading = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/3cee3565-689b-44df-a329-d04cb0da4f8c/M39SVlV3es.lottie"
//       loop
//       autoplay
//       style={{ width: "300px", margin: "auto" }}
//     />
//   );
// };

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
  const [inputPrompt, setInputPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [genImage, setGenImage] = useState(false);
  const chatContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [asked, setAsked] = useState(false);
  const [loadingPreviews, setLoadingPreviews] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      mirror: false,
    });
  }, []);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handlePromptChange = (e) => {
    setInputPrompt(e.target.value);
  };

  const handleSearch = async () => {
    setAsked(true);
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
      handleSendMessage();
      setInputPrompt("");
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

  const [fileType, setFileType] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [choice, setChoice] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    const storedValue = localStorage.getItem("showDisclaimer");
    return storedValue !== "false";
  });

  useEffect(() => {
    localStorage.setItem("showDisclaimer", showDisclaimer);
  }, [showDisclaimer]);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setGenImage(true);

    setLoadingPreviews(selectedFiles.map(() => true));
    setLoadingFiles(true);

    const newPreviews = await Promise.all(
      selectedFiles.map(
        (file, index) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();

            if (file.type === "image/heic") {
              reader.onload = async (event) => {
                try {
                  const heicArrayBuffer = event.target.result;
                  const heicBlob = new Blob([heicArrayBuffer]);
                  const convertedBlob = await heic2any({
                    blob: heicBlob,
                    toType: "image/jpeg",
                  });
                  const previewUrl = URL.createObjectURL(convertedBlob);
                  resolve(previewUrl);
                } catch (error) {
                  console.error("Error converting HEIC file:", error);
                  reject(error);
                } finally {
                  setLoadingPreviews((prev) => {
                    const updated = [...prev];
                    updated[index] = false;
                    return updated;
                  });
                }
              };
              reader.readAsArrayBuffer(file);
            } else {
              reader.onloadend = () => {
                resolve(reader.result);
                setLoadingPreviews((prev) => {
                  const updated = [...prev];
                  updated[index] = false;
                  return updated;
                });
              };
              reader.readAsDataURL(file);
            }
          })
      )
    );

    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    setLoadingFiles(false);
  };

  const handleConvert = async (e, choice) => {
    e.stopPropagation();
    setChoice(choice);
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // setLoadingColor(getRandomColor());

    try {
      // ref.current.continuousStart();

      if (files.length === 1) {
        const formData = new FormData();
        formData.append("image", files[0]);

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

        const convertedBlob = response.data;
        const fileName = `SmartJPG-converted-${files[0].name.replace(
          /\.[^/.]+$/,
          ""
        )}.jpg`;
        saveAs(convertedBlob, fileName);
      } else {
        const zip = new JSZip();

        for (const file of files) {
          const formData = new FormData();
          formData.append("image", file);

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

          const convertedBlob = response.data;
          const fileName = `SmartJPG-converted-${file.name.replace(
            /\.[^/.]+$/,
            ""
          )}.jpg`;
          zip.file(fileName, convertedBlob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "SmartJPG-converted-images.zip");
      }

      // ref.current.complete();
      setDownloaded(true);
    } catch (error) {
      console.error("Image conversion failed:", error);
      alert("Failed to convert the images.");
      // ref.current.complete();
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const [fileTypes, setFileTypes] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setGenImage(true);

    const droppedFiles = Array.from(e.dataTransfer.files);

    const fileDetails = droppedFiles.map((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return {
        file,
        fileType: file.type || fileExtension,
      };
    });

    console.log("File Details:", fileDetails);

    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setFileTypes((prevTypes) => [
      ...prevTypes,
      ...fileDetails.map((detail) => detail.fileType),
    ]);

    setPreviewLoading(true);

    const newPreviews = droppedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        if (file.type === "image/heic") {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const heicArrayBuffer = event.target.result;
              const heicBlob = new Blob([heicArrayBuffer]);
              const convertedBlob = await heic2any({
                blob: heicBlob,
                toType: "image/jpeg",
              });
              const previewUrl = URL.createObjectURL(convertedBlob);
              resolve(previewUrl);
            } catch (error) {
              console.error("Error converting HEIC file:", error);
              reject(error);
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
    });

    Promise.all(newPreviews).then((previewUrls) => {
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
      setPreviewLoading(false);
    });
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

  const handleConvertToPng = async (e, choice) => {
    e.stopPropagation();
    setChoice(choice);

    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      if (files.length === 1) {
        const formData = new FormData();
        formData.append("image", files[0]);

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

        const convertedBlob = response.data;
        const fileName = `SmartPNG-converted-${files[0].name.replace(
          /\.[^/.]+$/,
          ""
        )}.png`;
        saveAs(convertedBlob, fileName);
      } else {
        const zip = new JSZip();

        for (const file of files) {
          const formData = new FormData();
          formData.append("image", file);

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

          const convertedBlob = response.data;
          const fileName = `SmartPNG-converted-${file.name.replace(
            /\.[^/.]+$/,
            ""
          )}.png`;
          zip.file(fileName, convertedBlob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "SmartPNG-converted-images.zip");
      }

      // ref.current.complete();
    } catch (error) {
      console.error("PNG conversion failed:", error);
      alert("Failed to convert the images.");
      // ref.current.complete();
    }
  };

  const fileInputRef = useRef(null);
  const pdfFileInputRef = useRef(null);

  const handleContainerClick = () => {
    fileInputRef.current.click();
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

  const removeBg = async (e, choice) => {
    e.stopPropagation();
    setChoice(choice);

    if (!files) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", files[0]);

    // setLoadingColor(getRandomColor());
    setPreviewLoading(true);

    try {
      // ref.current.continuousStart();

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

      // ref.current.complete();
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Reached the limit of free requests. Please try again later.");
      // ref.current.complete();
    } finally {
      setPreviewLoading(false);
      setDownloaded(true);
      // ref.current.complete();
    }
  };

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const aiMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
      console.log("hi");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("Failed to get a response from AI.");
    }
  };

  const [showInput, setShowInput] = useState(false);

  const startOver = () => {
    setFiles([]);
    setPreviews([]);
    setChoice("");
    setDownloaded(false);
    setGenImage(false);
    setAsked(false);
    setDisplayText("");
    setMessages([]);
    setUserInput("");
    setProgress(0);
    setPreview(null);
    setPreviewLoading(false);
    setFileType("");
    setFileTypes([]);
    setPdfFiles([]);
    setFileName("SmartJPG-merged");
    setPrompt("");
    setInputPrompt("");
    setImageUrl(null);
    setGenImage(false);
    setShowInput(false);
  };

  return (
    <div className="main">
      {/* <LoadingBar
        ref={ref}
        color={loadingColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      /> */}

      {/* {page === "pdf" && (
        <div
          className="input-container"
          onClick={handleContainerClick}
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
            width: pdfFiles.length < 1 ? "50%" : "auto",
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
            <div style={{ textAlign: "center" }}>
              <PDF />
              <p className="drag-and-drop-text">Click to upload PDFs here 👋🏻</p>
              <h3 style={{ fontSize: "13px" }}>Files must be in PDF format</h3>
            </div>
          )}
        </div>
      )} */}

      {page === "smartify" && (
        <div className="col-12 row smartify">
          <div className={genImage ? "col-10" : "col-12"}>
            <div
              className={`${genImage || asked ? "" : "input-container"}
${showDisclaimer && !(genImage || asked) ? "sixty" : ""}
${
  showDisclaimer !== null && showDisclaimer === "false" && !(genImage || asked)
    ? "eighty"
    : ""
}
${isDragging ? "drag-over" : ""}`}
              onClick={handleContainerClick}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                position: "absolute",
                width: "100%",
                zIndex: "5",
                pointerEvents: previews.length > 0 ? "none" : "auto",
              }}
            >
              <input
                ref={fileInputRef}
                id="fileInput"
                className="input"
                type="file"
                accept="image/jpeg, image/png, image/webp, image/avif, image/heic, image/svg"
                multiple
                onChange={handleFileChange}
                style={{ margin: "10px 0", display: "none" }}
              />
            </div>
            <div className="title">
              <span className="model-name">Smartify 1.0</span>
            </div>
            <div className="Chat" ref={chatContainerRef}>
              <div
                className={
                  genImage ? "full" : showDisclaimer ? "sixty" : "eighty"
                }
              >
                <div className="chat-content">
                  {previews && previews.length === 0 && !asked && (
                    <div>
                      <div className="greeting">
                        <span className="greeting smartify-text">
                          Hello, click or drag to start.
                        </span>
                      </div>
                      <p className="greeting des">Current only accept images</p>
                    </div>
                  )}

                  {loadingFiles && (
                    <div className="chat-block d-flex">
                      <div className="ai-icon">
                        <img
                          src="/SmartJPG.png"
                          alt=""
                          style={{ width: "40px", marginRight: "10px" }}
                        />
                      </div>
                      <div className="chat-container ai">
                        <div className="chat">
                          <p className="text-length">
                            Please wait while we process your images...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {previews && previews.length > 0 && (
                    <div className="chat-block">
                      <div className="chat-container user">
                        <div className="chat">
                          <p className="text-length">
                            You attached {previews.length} documents:
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {previews && previews.length > 0 && (
                    <div>
                      <div className="chat-block d-flex">
                        <div className="ai-icon">
                          <img
                            src="/SmartJPG.png"
                            alt=""
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </div>
                        <div className="chat-container ai">
                          <div className="chat">
                            <div>
                              <p className="text-length">
                                Let me know which format you want to convert
                                them to. 👇🏻
                              </p>
                            </div>

                            <div className="d-flex choices">
                              <div
                                className="try-btn chat"
                                onClick={(e) => handleConvert(e, ".jpg")}
                              >
                                .jpg
                              </div>
                              <div
                                className="try-btn chat"
                                onClick={(e) => handleConvertToPng(e, ".png")}
                              >
                                .png
                              </div>

                              {previews.length === 1 && (
                                <div
                                  className="try-btn chat"
                                  onClick={(e) =>
                                    removeBg(e, "transparent background")
                                  }
                                >
                                  Remove Background
                                </div>
                              )}
                            </div>

                            {previews.length > 1 && (
                              <p className="reminder">Scroll to view 👉🏻</p>
                            )}

                            <div className="preview mobile">
                              {previews.length > 0 &&
                                previews.map((preview, index) => (
                                  <div key={index}>
                                    <img
                                      className="preview-image mobile"
                                      src={preview}
                                      alt={`Preview ${index + 1}`}
                                      style={{
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                        boxShadow:
                                          "0 0 10px rgba(0, 0, 0, 0.2)",
                                        opacity: loadingPreviews[index]
                                          ? 0.5
                                          : 1,
                                      }}
                                    />
                                  </div>
                                ))}
                            </div>

                            <div
                              style={{ margin: "auto", textAlign: "center" }}
                            >
                              <button
                                className="question show-input smartify-text"
                                onClick={startOver}
                              >
                                Wrong files? Upload other documents?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {asked && (
                    <div className="chat-block">
                      <div className="chat-container user">
                        <div className="chat">
                          <p className="text-length">
                            Image prompt: "{prompt}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {asked && (
                    <div className="chat-block d-flex">
                      <div className="chat-container ai">
                        <div className="ai-icon">
                          <img
                            src="/SmartJPG.png"
                            alt=""
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </div>
                        <div className="chat">
                          {loadingImage ? (
                            <div>
                              <Generating />
                              <p className="generating smartify-text">
                                Generating image...
                              </p>
                            </div>
                          ) : (
                            imageUrl && (
                              <div>
                                <img
                                  src={imageUrl}
                                  alt="AI Generated"
                                  style={{
                                    maxWidth: "300px",
                                    objectFit: "cover",
                                    width: "100%",
                                    borderRadius: "20px",
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {asked && imageUrl && (
                    <div className="chat-block d-flex">
                      <div className="chat-container ai">
                        <div className="ai-icon">
                          <img
                            // src="/SmartJPG.png"
                            alt=""
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </div>
                        <div className="chat">
                          <div>
                            <p className="text-length">
                              There you go! What do you think? 😊
                            </p>

                            <div
                              style={{ margin: "auto", textAlign: "center" }}
                            >
                              <button
                                className="question show-input smartify-text"
                                onClick={startOver}
                              >
                                Wanna switch to converting files?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {choice && (
                    <div className="chat-block">
                      <div className="chat-container user">
                        <div className="chat">
                          <p className="text-length">
                            Convert to {choice} format.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {downloaded && (
                    <div className="chat-block d-flex">
                      <div className="chat-container ai">
                        <div className="ai-icon">
                          <img
                            src="/SmartJPG.png"
                            alt=""
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </div>
                        <div className="chat">
                          <p className="text-length">
                            Success! Your files are downloaded 🎉.
                          </p>

                          <div>
                            <button
                              className="question show-input smartify-text"
                              onClick={startOver}
                            >
                              Upload other documents?
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!genImage ? (
                <div className={`${showDisclaimer ? "fourty" : "twenty"}`}>
                  <div style={{ width: "100%" }}>
                    {showDisclaimer && (
                      <div className="disclaimer">
                        <div className="hide" onClick={handleCloseDisclaimer}>
                          <FontAwesomeIcon
                            icon={faXmark}
                            size="xl"
                            color="white"
                          />
                        </div>
                        <h5 className="disclaimer-text">
                          Welcome to{" "}
                          <span className="smartify-text">Smartify</span>, your
                          personal AI assistant.
                        </h5>

                        <p className="disclaimer-text">
                          <a
                            href="https://www.smartjpg.app/terms"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Smartify Terms
                          </a>{" "}
                          Opens in a new window and the{" "}
                          <a
                            href="https://www.smartjpg.app/privacy"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Smartify Privacy
                          </a>{" "}
                          Notice Opens in a new window apply. Chats will not be
                          reviews at this moment. Smartify can make mistakes, so
                          double-check it.
                        </p>
                      </div>
                    )}

                    {showInput ? (
                      <div className="input-field">
                        <input
                          className="input-area"
                          placeholder="Message to generate image"
                          value={inputPrompt}
                          onChange={handlePromptChange}
                          onKeyDown={handleKeyDown}
                        />

                        <div className="send-btn">
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            onClick={handleSearch}
                            size="lg"
                          />
                        </div>

                        {/* <div className="send-container">
                          <div className="send-btn">
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              onClick={handleSearch}
                              size="lg"
                            />
                          </div>
                        </div> */}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <button
                          className="show-input smartify-text"
                          onClick={() => setShowInput(true)}
                        >
                          Wanna generate image instead?
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className={genImage ? "col-2" : "d-none"}>
            <div className="preview">
              {previews.length > 0 &&
                previews.map((preview, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {loadingPreviews[index] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 10,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        Loading...
                      </div>
                    )}
                    <img
                      className="preview-image"
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        opacity: loadingPreviews[index] ? 0.5 : 1,
                      }}
                    />
                    <p className="preview-text">{files[index].name}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* <div className="col-6">
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Main;
