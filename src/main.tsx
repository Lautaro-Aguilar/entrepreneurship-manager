import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import "./App.css";
import Clientes from "./components/Clientes/page";
import Orders from "./components/Orders/page";
import Productos from "./components/Productos/page";
import Inicio from "./components/Inicio/page";
import { createTheme, ThemeProvider } from "@mui/material";
import Components from "./components/Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "/Clientes",
        element: <Clientes />,
      },
      {
        path: "/Pedidos",
        element: <Orders />,
      },
      {
        path: "/Productos",
        element: <Productos />,
      },
      {
        path: "/Components",
        element: <Components />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e85d04",
    },
    secondary: {
      main: "#FFBA08",
    },
    info: {
      main: "#1789FC",
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
    fontWeightBold: 600,
    fontWeightMedium: 400,
    fontWeightRegular: 300,
    fontWeightLight: 200,
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 300,
    },
    button: {
      textTransform: "none",
      color: "white",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
