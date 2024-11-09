import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="pdf-div"
      style={{
        width: "250px",
        height: "350px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={250}
          height={300}
        />
      </Document>
    </div>
  );
}

export default PdfComp;
