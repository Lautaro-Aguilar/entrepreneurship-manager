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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
