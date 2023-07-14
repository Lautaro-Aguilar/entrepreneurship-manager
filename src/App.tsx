import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import lightTheme from "./styles/lightTheme";
import { createContext, useEffect, useMemo, useState } from "react";
import darkTheme from "./styles/darkTheme";

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
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
