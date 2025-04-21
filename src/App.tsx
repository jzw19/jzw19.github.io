import "./App.scss";
import React, { FC } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";
import Processes from "./components/Processes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App: FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          {/* <Route path="/processes" element={<Processes />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
