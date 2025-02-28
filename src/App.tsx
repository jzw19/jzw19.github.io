import "./App.css";
import React, { FC } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<div>TODO</div>} />
        <Route path="/about" element={<div>TODO</div>} />
      </Routes>
    </div>
  );
};

export default App;
