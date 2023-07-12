/* eslint-disable @typescript-eslint/no-empty-function */
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import lightTheme from "./styles/lightTheme";
import { createContext, useMemo, useState } from "react";
import darkTheme from "./styles/darkTheme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "",
});

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

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
