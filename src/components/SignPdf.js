import React, { useRef, useState, useEffect, useMemo } from "react";
import { Document, Page } from "react-pdf";
import SignaturePad from "react-signature-canvas";
import Draggable from "react-draggable";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { pdfjs } from "react-pdf";
import { Helmet } from "react-helmet";
import Description from "./Description";
import LoadingBar from "react-top-loading-bar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const loadingBarRef = useRef(null);
  const [loadingColor, setLoadingColor] = useState("#f11946");

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

  const cachedFile = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  const pdfContent = useMemo(() => {
    if (!cachedFile || !numPages) return null;

    return (
      <>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            width={pdfWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </>
    );
  }, [cachedFile, numPages, pdfWidth]);

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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const downloadSignedPdf = async () => {
    if (!pdfContainerRef.current) {
      alert("No signed PDF to download.");
      return;
    }

    setLoadingColor(getRandomColor());
    loadingBarRef.current.continuousStart();

    const container = pdfContainerRef.current;
    const rect = container.getBoundingClientRect();

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 4,
        useCORS: true,
        width: rect.width,
        height: rect.height,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      const pdfWidth = 210;
      const pdfHeight = (contentHeight * pdfWidth) / contentWidth;

      const orientation =
        contentWidth > contentHeight ? "landscape" : "portrait";

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "SLOW"
      );
      pdf.save("SmartJPG-signed.pdf");

      loadingBarRef.current.complete();
    } catch (error) {
      console.error("Error generating PDF:", error);
      loadingBarRef.current.complete();
    }
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <LoadingBar color={loadingColor} ref={loadingBarRef} height={6} />
      <div className="SignPdf">
        <Helmet>
          <title>Easy Sign PDF | SmartJPG</title>
          <link rel="canonical" href="https://www.smartjpg.app/sign-pdf" />
          <meta
            name="description"
            content="Sign PDF online for free. Upload a PDF file, sign it, and download the signed PDF. No registration required."
          />
        </Helmet>
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
                  <DotLottieReact
                    src="https://lottie.host/d998a890-8cc5-4654-95b5-180a91823250/9B7AS2nPMF.lottie"
                    loop
                    autoplay
                    style={{ width: "300px", margin: "auto" }}
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
                <Document
                  file={cachedFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={{ cMapUrl: "cmaps/", cMapPacked: true }}
                >
                  {pdfContent}
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
      <Description />
    </div>
  );
};

export default SignPdf;
