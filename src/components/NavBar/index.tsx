import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React, { FC } from "react";
import Home from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const NavBar: FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar variant="regular">
        <IconButton
          edge="start"
          color="inherit"
          size="large"
          aria-label="Home"
          sx={{ mr: 2, height: 1 / 1 }}
          onClick={() => navigate("/")}
        >
          <Home />
        </IconButton>
        <Button size="large" onClick={() => navigate("/resume")}>
          <strong>Resume</strong>
        </Button>
        {/* <Button size="large" onClick={() => navigate("/projects")}><strong>Projects</strong></Button> */}
        {/* <Button size="large" onClick={() => navigate("/about")}><strong>About</strong></Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
