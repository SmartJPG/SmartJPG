import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function SinglePdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pages, setPages] = useState([]);
  const [deletedPages, setDeletedPages] = useState(new Set());
  const [draggingPageIndex, setDraggingPageIndex] = useState(null);

  useEffect(() => {
    setPages(Array.from({ length: numPages }, (_, i) => i + 1));
  }, [numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPages(Array.from({ length: numPages }, (_, i) => i + 1));
  };

  const handleDeletePage = (pageNumber) => {
    setDeletedPages((prev) => new Set(prev).add(pageNumber));
  };

  const handleDragStart = (e, index) => {
    setDraggingPageIndex(index);
  };

  const handleDragEnter = (e, index) => {
    if (draggingPageIndex === index) return;

    const newPages = [...pages];
    const [draggedPage] = newPages.splice(draggingPageIndex, 1);
    newPages.splice(index, 0, draggedPage);

    setDraggingPageIndex(index);
    setPages(newPages);
  };

  const handleDragEnd = () => {
    setDraggingPageIndex(null);
  };

  const handleDownloadPdf = async () => {
    const scale = 3;

    const pdf = new jsPDF();

    for (let i = 0; i < pages.length; i++) {
      const pageNumber = pages[i];
      if (!deletedPages.has(pageNumber)) {
        const pageElement = document.querySelector(
          `[data-page-number="${pageNumber}"] canvas`
        );

        if (pageElement) {
          const originalWidth = pageElement.clientWidth;
          const originalHeight = pageElement.clientHeight;

          const canvasData = await html2canvas(pageElement, {
            scale,
            useCORS: true,
            allowTaint: true,
            width: originalWidth,
            height: originalHeight,
          });

          const imgData = canvasData.toDataURL("image/png", 1.0);

          // Convert dimensions to points (1 point = 1/72 inch)
          const pageWidth = originalWidth * (72 / 96); // Adjusted from pixels to points
          const pageHeight = originalHeight * (72 / 96);

          // Set PDF page to match the rendered canvas size
          pdf.setPage(i + 1);
          pdf.internal.pageSize.width = pageWidth;
          pdf.internal.pageSize.height = pageHeight;

          // Add the image to the PDF at full size
          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

          // Add a new page unless it’s the last page
          if (i < pages.length - 1) pdf.addPage();
        }
      }
    }

    pdf.save("full-size-high-quality-document.pdf");
  };

  return (
    <div className="pdf-div">
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            height: "100%",
            zIndex: "7000",
          }}
        >
          {pages
            .filter((pageNumber) => !deletedPages.has(pageNumber))
            .map((pageNumber, index) => (
              <div
                key={pageNumber}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  width: "250px",
                  cursor: "move",
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={250}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    onClick={() => handleDeletePage(pageNumber)}
                    size="xl"
                    color="red"
                  />
                </div>
              </div>
            ))}
        </div>
      </Document>
      <div className="d-flex">
        {Array.from(deletedPages).length > 0 && (
          <button
            className="swap"
            onClick={() => setDeletedPages(new Set())}
            style={{
              backgroundColor: "#007bff",
              color: "white",
            }}
          >
            Undo
          </button>
        )}
        <button
          className="swap"
          onClick={handleDownloadPdf}
          style={{
            backgroundColor: "#28a745",
            color: "white",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default SinglePdfComp;
