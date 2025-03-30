import "./index.css";
import { Document, Page } from "react-pdf";
import React, { FC, useState } from "react";
import resume from "../../assets/Resume.pdf";
import { pdfjs } from "react-pdf";
import { useWindowSize } from "hooks/useWindowSize";
import PageView from "../PageView";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume: FC = () => {
  const [fullWidth] = useWindowSize();

  return (
    <PageView>
      <Document file={resume}>
        <Page
          className="resume"
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={Math.floor(fullWidth / 2)}
        />
      </Document>
    </PageView>
  );
};

export default Resume;
