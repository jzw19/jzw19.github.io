import "./index.scss";

import React, { FC, useRef } from "react";
import { Helmet } from "react-helmet-async";

import { IconButton } from "@mui/material";
import PageScrollButtons from "../../components/PageScrollButtons";
import PageView from "../../components/PageView";
import SkillLogos from "./SkillLogos";
import githubLogo from "../../assets/github-mark-white.png";
import linkedinLogo from "../../assets/InBug-White.png";

const Home: FC = () => {
  const firstPageRef = useRef<HTMLDivElement | null>(null);
  const secondPageRef = useRef<HTMLDivElement | null>(null);

  const pageRefs: React.RefObject<HTMLDivElement | null>[] = [
    firstPageRef,
    secondPageRef,
  ];

  const GITHUB_LABEL = "Button. GitHub Logo. Click to view my GitHub profile.";
  const LINKEDIN_LABEL = "Button. LinkedIn Logo. Click to view my LinkedIn profile.";

  return (
    <div className="home">
      <Helmet>
        <title>Jimmy Wen - Product-conscious Fullstack Software Engineer</title>
        <meta name="description" content="Portfolio of Jimmy Wen, a product-conscious fullstack software engineer with expertise in building B2B SaaS platforms, frontend development, debugging, and testing methodologies." />
        <link rel="canonical" href="https://jzw19.github.io/" />
        <meta property="og:title" content="Jimmy Wen - Product-conscious Fullstack Software Engineer" />
        <meta property="og:description" content="Portfolio of Jimmy Wen, a product-conscious fullstack software engineer with expertise in building B2B SaaS platforms, frontend development, debugging, and testing methodologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jzw19.github.io/" />
        <meta property="og:image" content="https://jzw19.github.io/og-image.jpg" />
        <meta property="og:site_name" content="Jimmy Wen Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jimmy Wen - Product-conscious Fullstack Software Engineer" />
        <meta name="twitter:description" content="Portfolio of Jimmy Wen, a product-conscious fullstack software engineer with expertise in building B2B SaaS platforms, frontend development, debugging, and testing methodologies." />
      </Helmet>
      <PageView ref={firstPageRef}>
        <h1>
          Hi, I'm Jimmy
        </h1>
        <h4>
          Product-conscious
          <br />
          Fullstack Software Engineer
        </h4>
        <div className="links">
          <IconButton
            className="contentButton"
            disableRipple
            onClick={() => (window.location.href = "https://github.com/jzw19")}
          >
            <img src={githubLogo} className="buttonLogo" alt={GITHUB_LABEL} aria-label={GITHUB_LABEL} />
          </IconButton>
          <IconButton
            className="contentButton"
            disableRipple
            onClick={() => (window.location.href = "https://www.linkedin.com/in/jimmy-wen-0b5425129/")}
          >
            <img src={linkedinLogo} className="buttonLogo" alt={LINKEDIN_LABEL} aria-label={LINKEDIN_LABEL} />
          </IconButton>
        </div>
      </PageView>
      <PageView ref={secondPageRef}>
        <SkillLogos />
      </PageView>
      <PageScrollButtons pageRefs={pageRefs} />
    </div>
  );
};

export default Home;