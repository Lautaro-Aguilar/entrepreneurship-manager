import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import "./App.css";
import Clientes from "./components/Clientes/page";
import Orders from "./components/Orders/page";
import Productos from "./components/Productos/page";
import Components from "./components/Components";
import Dashboard from "./components/Panel/page";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./components/Inicio/AuthProvider";
import Inicio from "./components/Inicio/page";

const darkTheme = createTheme({
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

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Root />}>
                <Route index element={<Inicio />} />
                <Route path='/Clientes' element={<Clientes />} />
                <Route path='/Pedidos' element={<Orders />} />
                <Route path='/Productos' element={<Productos />} />
                <Route path='/Components' element={<Components />} />
                <Route path='/Dashboard' element={<Dashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
