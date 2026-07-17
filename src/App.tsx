import "./App.scss";

import React, { FC } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import Router from "./Router";
import SkipToContent from "./components/SkipToContent";

const App: FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <SkipToContent />
        <NavBar />
        <Router />
      </div>
    </ThemeProvider>
  );
};

export default App;
