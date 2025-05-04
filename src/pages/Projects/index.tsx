import { Card, CardContent } from "@mui/material";
import React, { FC } from "react";

import PageView from "../../components/PageView";
import { previewMarkdown } from "assets";
import { useNavigate } from "react-router-dom";

const Projects: FC = () => {
  const navigate = useNavigate();

  return (
    <PageView>
      <Card
        onClick={() => navigate("/projects/markdown")}
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
  );
};

export default Projects;
