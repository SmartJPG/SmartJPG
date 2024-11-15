import React, { memo, useState } from "react";
import { Document, Page } from "react-pdf";

const PdfComp = memo(({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="pdf-div"
      style={{
        width: "250px",
        height: "100%",
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
          height={300}
        />
      </Document>
    </div>
  );
});

export default PdfComp;
