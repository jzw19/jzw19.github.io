import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { FC } from "react";

import { IconButton } from "@mui/material";
import { useAppBarHeight } from "hooks/useAppBarHeight";
import { useScrollPosition } from "hooks/useScrollPosition";

interface PageScrollButtonsProps {
  pageRefs: React.RefObject<HTMLDivElement | null>[];
}

const PageScrollButtons: FC<PageScrollButtonsProps> = ({ pageRefs }) => {
  const currentScrollPositionPx = useScrollPosition(false);
  const muiAppBarHeightPx = useAppBarHeight(false);
  const muiAppBarHeightRem = useAppBarHeight(true);

  const scrollToPage = (pageRefs: React.RefObject<HTMLDivElement | null>[], index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else if (index < pageRefs.length && index > -1) {
      pageRefs[index].current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <>
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
              pageRefs,
              Math.floor(
                (currentScrollPositionPx - muiAppBarHeightPx) /
                  (window.innerHeight + muiAppBarHeightPx)
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
          onClick={() => {
            scrollToPage(
              pageRefs,
              Math.ceil(
                (currentScrollPositionPx + muiAppBarHeightPx) /
                  (window.innerHeight - muiAppBarHeightPx)
              )
            )
          }
          }
        >
          <KeyboardArrowDown />
        </IconButton>
      )}
    </>
  );
};

export default PageScrollButtons;
