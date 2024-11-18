import React, { useRef, useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import SignaturePad from "react-signature-canvas";
import Draggable from "react-draggable";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import { GlobalWorkerOptions } from "pdfjs-dist";
import { pdfjs } from "react-pdf";

// GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
import "@react-pdf-viewer/core/lib/styles/index.css";
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

const SignPdf = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [signature, setSignature] = useState(null);
  const [signatureSize, setSignatureSize] = useState({
    width: 120,
    height: 50,
  });
  const [pdfWidth, setPdfWidth] = useState(0);
  const sigPadRef = useRef(null);
  const col6Ref = useRef(null);

  const pdfContainerRef = useRef(null);

  useEffect(() => {
    const updatePdfWidth = () => {
      if (col6Ref.current) {
        setPdfWidth(col6Ref.current.offsetWidth);
      }
    };

    updatePdfWidth();
    window.addEventListener("resize", updatePdfWidth);
    return () => window.removeEventListener("resize", updatePdfWidth);
  }, []);

  const onFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const saveSignature = () => {
    const dataURL = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(dataURL);
  };

  const clearSignature = () => {
    sigPadRef.current.clear();
    setSignature(null);
  };

  const handleWidthResize = (e) => {
    setSignatureSize((prevSize) => ({
      ...prevSize,
      width: parseInt(e.target.value, 10),
    }));
  };

  const handleHeightResize = (e) => {
    setSignatureSize((prevSize) => ({
      ...prevSize,
      height: parseInt(e.target.value, 10),
    }));
  };

  // const downloadSignedPdf = async () => {
  //   if (!pdfContainerRef.current) {
  //     alert("No signed PDF to download.");
  //     return;
  //   }

  //   const container = pdfContainerRef.current;

  //   const canvas = await html2canvas(container, {
  //     backgroundColor: null,
  //     scale: 2,
  //     useCORS: true,
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdfWidth = 210;
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: [pdfWidth, pdfHeight],
  //   });

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("signed.pdf");
  // };

  const downloadSignedPdf = async () => {
    if (!pdfContainerRef.current) {
      alert("No signed PDF to download.");
      return;
    }

    const container = pdfContainerRef.current;
    const rect = container.getBoundingClientRect();

    const canvas = await html2canvas(container, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      width: rect.width,
      height: rect.height,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pdfWidth = 210;
    const pdfHeight = (contentHeight * pdfWidth) / contentWidth;

    const orientation = contentWidth > contentHeight ? "landscape" : "portrait";

    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
    pdf.save("signed.pdf");
  };

  return (
    <div className="SignPdf">
      <div className="row col-12">
        <h2 style={{ marginBottom: "20px" }}>Sign PDF</h2>

        <div className="col-6" ref={col6Ref}>
          {!file && (
            <div
              className="input-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                padding: "20px",
                cursor: "pointer",
                borderRadius: "20px",
              }}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <div>
                <img
                  src="sign.gif"
                  alt="Loading"
                  style={{ width: "100px", height: "80px" }}
                />
                <p className="drag-and-drop-text">
                  Click to upload a PDF here 👋🏻
                </p>
                <h3 style={{ fontSize: "13px", fontWeight: "default" }}>
                  Supported Format: PDF
                </h3>
              </div>
              <input
                id="fileUpload"
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}

          {file && (
            <div
              ref={pdfContainerRef}
              style={{ position: "relative", width: "100%" }}
            >
              {/* <Document
                file={file ? URL.createObjectURL(file) : null}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) =>
                  console.error("Error loading PDF:", error)
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={index} pageNumber={index + 1} width={pdfWidth} />
                ))}
              </Document> */}
              <Document
                file={file ? URL.createObjectURL(file) : null}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) =>
                  console.error("Error loading PDF:", error)
                }
                options={{ cMapUrl: "cmaps/", cMapPacked: true }}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={index}
                    pageNumber={index + 1}
                    width={pdfWidth}
                    scale={1.0}
                  />
                ))}
              </Document>
              {signature && (
                <Draggable>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1000,
                      width: signatureSize.width,
                      height: signatureSize.height,
                      cursor: "move",
                    }}
                  >
                    <img
                      src={signature}
                      alt="Signature"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </Draggable>
              )}
            </div>
          )}
        </div>

        <div className="col-6">
          <div className="signature-container">
            <p style={{ textAlign: "left" }}>Your Signature:</p>
            <SignaturePad
              ref={sigPadRef}
              canvasProps={{
                width: 300,
                height: 100,
                style: {
                  borderBottom: "1px solid #000",
                },
              }}
            />

            <br />

            <div className="d-flex">
              <button className="swap save" onClick={saveSignature}>
                Save Signature
              </button>
              <button className="swap clear" onClick={clearSignature}>
                Clear Signature
              </button>
            </div>

            <div className="resize-container">
              <label>
                Width:
                <input
                  className="resize"
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={signatureSize.width}
                  onChange={handleWidthResize}
                />
              </label>
              <br />
              <label>
                Height:
                <input
                  className="resize"
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={signatureSize.height}
                  onChange={handleHeightResize}
                />
              </label>
            </div>
            {file && (
              <>
                <br />
                <button
                  className="swap download-pdf"
                  onClick={downloadSignedPdf}
                >
                  Download Signed PDF
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPdf;
