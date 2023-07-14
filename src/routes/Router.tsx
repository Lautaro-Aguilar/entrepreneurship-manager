import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Inicio from "../components/Inicio/page";
import Clientes from "../components/Clientes/page";
import Orders from "../components/Orders/page";
import Productos from "../components/Productos/page";
import Components from "../components/Components";
import Dashboard from "../components/Panel/page";

const Router = createBrowserRouter([
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
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default Router;
