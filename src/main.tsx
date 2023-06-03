import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/Contact";
import "./app.css";
import Clientes from "./components/Clientes/page";
import Pedidos from "./components/Pedidos/page";
import Productos from "./components/Productos/page";
import Ventas from "./components/Ventas/page";
import Inicio from "./components/Inicio/page";
import { createTheme, ThemeProvider } from "@mui/material";
/* import App from './App' */

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
        element: <Pedidos />
      },
      {
        path: "/Productos",
        element: <Productos />
      },
      {
        path: "/Ventas",
        element: <Ventas />
      }
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e85d04',
    },
    secondary: {
      main: '#FFBA08',
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
