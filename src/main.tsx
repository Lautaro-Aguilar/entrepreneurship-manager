import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import "./app.css";
import Clientes from "./components/Clientes/page";
import Pedidos from "./components/Pedidos/page";
import Productos from "./components/Productos/page";
import Ventas from "./components/Ventas/page";
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
        element: <Pedidos />,
      },
      {
        path: "/Productos",
        element: <Productos />,
      },
      {
        path: "/Ventas",
        element: <Ventas />,
      },
      {
        path: "/Components",
        element: <Components />,
      },
    ],
  },
]);

const theme = createTheme({
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
  },
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
    MuiTypography: {},
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
