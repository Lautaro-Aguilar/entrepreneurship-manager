import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import lightTheme from "./styles/lightTheme";
import { createContext, useEffect, useMemo, useState } from "react";
import darkTheme from "./styles/darkTheme";
import { AuthProvider } from "./components/Inicio/AuthProvider";
import Root from "./routes/Root";
import Inicio from "./components/Inicio/page";
import Clientes from "./components/Clientes/page";
import Orders from "./components/Orders/page";
import Productos from "./components/Productos/page";
import Components from "./components/Components";
import { Dashboard } from "@mui/icons-material";

interface ThemeProps {
  toggleColorMode: () => void;
  mode: string;
}

export const ColorModeContext = createContext<ThemeProps>({
  toggleColorMode: () => null,
  mode: "",
});

function App() {
  const [mode, setMode] = useState<string>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const result = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("mode", result);
          return result;
        });
      },
      mode,
    }),
    [mode]
  );

  useEffect(() => {
    const modeInMemory = localStorage.getItem("mode");
    if (!modeInMemory) {
      console.log("no hay valor en memoria: ", modeInMemory);
      localStorage.setItem("mode", "light");
    }
    if (modeInMemory !== null) {
      setMode(modeInMemory);
    }
  }, []);

  const theme = useMemo(() => {
    if (mode === "light") {
      return lightTheme;
    }
    return darkTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Router>
        <ThemeProvider theme={theme}>
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
    </ColorModeContext.Provider>
  );
}

export default App;
