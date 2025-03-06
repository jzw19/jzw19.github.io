import "./index.css";
import { Document, Page } from "react-pdf";
import React, { FC, useState } from "react";
import resume from "../../assets/My_Resume.pdf";
import { pdfjs } from "react-pdf";
import { useWindowSize } from "hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume: FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [fullWidth] = useWindowSize();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);

  return (
    <div className="body">
      <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          className="resume"
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={Math.floor(fullWidth / 2)}
        />
      </Document>
      <p className="content">
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default Resume;
