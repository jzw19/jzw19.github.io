import "./App.css";
import React, { FC, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";
import { useAppBarHeight } from "hooks/useAppBarHeight";

const App: FC = () => {
  const muiAppBarHeight = useAppBarHeight();

  return (
    <div className="App">
      <NavBar />
      <div
        className="body"
        style={{ minHeight: `calc(100vh - ${muiAppBarHeight}px)` }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<div>TODO</div>} />
          <Route path="/about" element={<div>TODO</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
