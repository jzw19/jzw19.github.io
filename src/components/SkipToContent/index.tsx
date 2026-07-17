import React from "react";
import { Box, Button } from "@mui/material";

const SkipToContent: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: -40,
        left: 0,
        background: "background.paper",
        color: "text.primary",
        padding: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "top 0.2s ease-in-out",
      }}
    >
      <Button
        size="small"
        variant="text"
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById("main-content");
          if (mainContent) {
            mainContent.focus();
          }
        }}
      >
        Skip to main content
      </Button>
    </Box>
  );
};

export default SkipToContent;