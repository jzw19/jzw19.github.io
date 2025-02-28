import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React, { FC } from "react";
import Home from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const NavBar: FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="regular">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Home"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <Home />
        </IconButton>
        <Button onClick={() => navigate("/resume")}>Resume</Button>
        <Button onClick={() => navigate("/projects")}>Projects</Button>
        <Button onClick={() => navigate("/about")}>About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
