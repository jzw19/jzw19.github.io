import React, { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SkeletonLoader from "./components/SkeletonLoader";

const Home = lazy(() => import("./pages/Home"));
const Resume = lazy(() => import("./pages/Resume"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Markdown = lazy(() => import("./pages/Projects/Markdown"));

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<SkeletonLoader />}>
          <Home />
        </Suspense>
      } />
      <Route path="/resume" element={
        <Suspense fallback={<SkeletonLoader />}>
          <Resume />
        </Suspense>
      } />
      <Route path="/about" element={
        <Suspense fallback={<SkeletonLoader />}>
          <About />
        </Suspense>
      } />
      <Route path="/projects" element={
        <Suspense fallback={<SkeletonLoader />}>
          <Projects />
        </Suspense>
      } />
      <Route path="/projects/markdown" element={
        <Suspense fallback={<SkeletonLoader />}>
          <Markdown />
        </Suspense>
      } />
    </Routes>
  );
};

export default Router;