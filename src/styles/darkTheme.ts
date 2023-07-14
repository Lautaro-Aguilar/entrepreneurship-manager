import { createTheme } from "@mui/material";

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

export default darkTheme;
