import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Markdown from "./pages/Projects/Markdown";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/markdown" element={<Markdown />} />
    </Routes>
  );
}

export default Router;