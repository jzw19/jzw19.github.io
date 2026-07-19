import "./index.scss";

import { Document, Page } from "react-pdf";
import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

import PageView from "../../components/PageView";
import { pdfjs } from "react-pdf";
import resume from "../../assets/Resume.pdf";
import { useWindowSize } from "hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume: FC = () => {
  const [fullWidth] = useWindowSize();

  return (
    <>
      <Helmet>
        <title>Jimmy Wen's Resume - Software Engineer Portfolio</title>
        <meta name="description" content="View Jimmy Wen's resume showcasing expertise in software engineering, full-stack development, B2B SaaS platforms, and technical leadership." />
        <link rel="canonical" href="https://jzw19.github.io/resume" />
        <meta property="og:title" content="Jimmy Wen's Resume - Software Engineer Portfolio" />
        <meta property="og:description" content="View Jimmy Wen's resume showcasing expertise in software engineering, full-stack development, B2B SaaS platforms, and technical leadership." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jzw19.github.io/resume" />
        <meta property="og:image" content="https://jzw19.github.io/og-image.jpg" />
        <meta property="og:site_name" content="Jimmy Wen Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jimmy Wen's Resume - Software Engineer Portfolio" />
        <meta name="twitter:description" content="View Jimmy Wen's resume showcasing expertise in software engineering, full-stack development, B2B SaaS platforms, and technical leadership." />
      </Helmet>
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
    </>
  );
};

export default Resume;