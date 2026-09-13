import "./App.scss";

import React, { FC, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import Router from "./Router";
import SkipToContent from "./components/SkipToContent";
const ChatBot = lazy(() => import("./chatbot/components/ChatBot").then(module => ({ default: module.ChatBot })));

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
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
