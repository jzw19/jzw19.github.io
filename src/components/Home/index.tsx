import "./index.css";
import React, { FC } from "react";
import githubLogo from "../../assets/github-mark-white.png";
import linkedinLogo from "../../assets/InBug-White.png";
import { IconButton } from "@mui/material";

const Home: FC = () => {
  return (
    <div className="body">
      <h1>Hi, I'm Jimmy</h1>
      <h4>Fullstack Engineer</h4>
      <div className="links">
        <IconButton className="contentButton" onClick={() => window.location.href = "https://github.com/jzw19"}>
          <img src={githubLogo} className="buttonLogo" />
        </IconButton>
        <IconButton className="contentButton" onClick={() => window.location.href = "https://www.linkedin.com/in/jimmy-wen-0b5425129/"}>
          <img src={linkedinLogo} className="buttonLogo" />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
