import { Card, CardContent } from "@mui/material";
import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

import PageView from "../../components/PageView";
import { previewMarkdown } from "assets";
import { useNavigate } from "react-router-dom";

const Projects: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Jimmy Wen's Projects - Software Engineer Portfolio</title>
        <meta name="description" content="Explore Jimmy Wen's software engineering projects, including a markdown parser and other full-stack applications." />
        <link rel="canonical" href="https://jzw19.github.io/projects" />
        <meta property="og:title" content="Jimmy Wen's Projects - Software Engineer Portfolio" />
        <meta property="og:description" content="Explore Jimmy Wen's software engineering projects, including a markdown parser and other full-stack applications." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jzw19.github.io/projects" />
        <meta property="og:image" content="https://jzw19.github.io/og-image.jpg" />
        <meta property="og:site_name" content="Jimmy Wen Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jimmy Wen's Projects - Software Engineer Portfolio" />
        <meta name="twitter:description" content="Explore Jimmy Wen's software engineering projects, including a markdown parser and other full-stack applications." />
      </Helmet>
      <PageView>
        <Card
          onClick={() => navigate("/projects/markdown")}
          aria-label="View Markdown Parser project details"
          raised
          sx={{
            "&:hover": {
              boxShadow: 20,
              cursor: "pointer",
              transform: "scale(1.02)",
            },
            width: "30%",
          }}
        >
          <CardContent>
            <img src={previewMarkdown} alt="Markdown Parser" width="90%" />
            <figcaption style={{ textAlign: "center" }}>
              <strong>Markdown Parser</strong>
            </figcaption>
          </CardContent>
        </Card>
      </PageView>
    </>
  );
};

export default Projects;