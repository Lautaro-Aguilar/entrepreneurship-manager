import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import lightTheme from "./styles/lightTheme";
import Router from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);
