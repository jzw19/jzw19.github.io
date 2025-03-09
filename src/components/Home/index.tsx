import "./index.css";
import React, { FC, useEffect, useState } from "react";
import githubLogo from "../../assets/github-mark-white.png";
import linkedinLogo from "../../assets/InBug-White.png";
import { IconButton } from "@mui/material";
import PageView from "../PageView";
import { useScrollPosition } from "hooks/useScrollPosition";

const Home: FC = () => {
  const MIN_PAGE = 0;
  const MAX_PAGE = 1;

  const scrollPosition = useScrollPosition();

  // const firstPageRef = useRef(null);
  // const secondPageRef = useRef(null);

  const [page, setPage] = useState<number>(MIN_PAGE);
  const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);

  useEffect(() => {
    const scrollDiff = scrollPosition - prevScrollPosition;
    if(page < MAX_PAGE && scrollDiff > 0) {
      setPage(page + 1);
    } else if(page > MIN_PAGE) {
      setPage(page - 1);
    }
    setPrevScrollPosition(scrollPosition);
  }, [scrollPosition])

  return (
    <>
      {/* <Slide direction="up" in={page === 0} ref={firstPageRef}> */}
        {/* <PageView ref={firstPageRef}> */}
        <PageView>
          <h1>Hi, I'm Jimmy</h1>
          <h4>Product-oriented<br/>Fullstack Software Engineer</h4>
          <div className="links">
            <IconButton className="contentButton" disableRipple onClick={() => window.location.href = "https://github.com/jzw19"}>
              <img src={githubLogo} className="buttonLogo" />
            </IconButton>
            <IconButton className="contentButton" disableRipple onClick={() => window.location.href = "https://www.linkedin.com/in/jimmy-wen-0b5425129/"}>
              <img src={linkedinLogo} className="buttonLogo" />
            </IconButton>
          </div>
        </PageView>
      {/* </Slide> */}
      {/* <Slide direction="down" in={page === 1} ref={secondPageRef}>
        <PageView ref={secondPageRef}>
          <h1>foo</h1>
        </PageView>
      </Slide> */}
    </>
  );
};

export default Home;
