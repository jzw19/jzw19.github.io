import "./index.scss";
import React, { FC, useRef } from "react";
import githubLogo from "../../assets/github-mark-white.png";
import linkedinLogo from "../../assets/InBug-White.png";
import { IconButton } from "@mui/material";
import PageView from "../PageView";
import { useScrollPosition } from "hooks/useScrollPosition";
import { useAppBarHeight } from "hooks/useAppBarHeight";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import SkillLogos from "./SkillLogos";

const Home: FC = () => {
  const currentScrollPositionPx = useScrollPosition(false);
  const muiAppBarHeightPx = useAppBarHeight(false);
  const muiAppBarHeightRem = useAppBarHeight(true);

  const firstPageRef = useRef<HTMLDivElement | null>(null);
  const secondPageRef = useRef<HTMLDivElement | null>(null);

  const pageRefs: React.RefObject<HTMLDivElement | null>[] = [
    firstPageRef,
    secondPageRef,
  ];

  const scrollToPage = (index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else if (index < pageRefs.length && index > -1) {
      pageRefs[index].current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <PageView ref={firstPageRef}>
        <h1>Hi, I'm Jimmy</h1>
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
            <img src={githubLogo} className="buttonLogo" />
          </IconButton>
          <IconButton
            className="contentButton"
            disableRipple
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/jimmy-wen-0b5425129/")
            }
          >
            <img src={linkedinLogo} className="buttonLogo" />
          </IconButton>
        </div>
      </PageView>
      <PageView ref={secondPageRef}>
        <SkillLogos />
      </PageView>
      {currentScrollPositionPx > muiAppBarHeightPx && (
        <IconButton
          className="prevPageButton"
          sx={{
            position: "fixed",
            top: `${muiAppBarHeightRem + 1}rem`,
            right: "1rem",
          }}
          onClick={() => {
            scrollToPage(
              Math.floor(
                (currentScrollPositionPx - 1) /
                  (window.innerHeight - muiAppBarHeightPx)
              )
            )
          }
          }
        >
          <KeyboardArrowUp />
        </IconButton>
      )}
      {(currentScrollPositionPx <
        document.body.offsetHeight - window.innerHeight - muiAppBarHeightPx ||
        !currentScrollPositionPx) && (
        <IconButton
          className="nextPageButton"
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
          onClick={() =>
            scrollToPage(
              Math.ceil(
                (currentScrollPositionPx + 1) /
                  (window.innerHeight - muiAppBarHeightPx)
              )
            )
          }
        >
          <KeyboardArrowDown />
        </IconButton>
      )}
    </div>
  );
};

export default Home;
