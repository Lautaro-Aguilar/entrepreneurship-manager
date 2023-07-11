import { createTheme } from "@mui/material";

/* const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a71db",
    },
    secondary: {
      main: "#92c3ff",
    },
    info: {
      main: "#8884FF",
    },
    background: {
      default: "#fafafa",
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#d5dfec",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#d5dfec",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#d5dfec",
        },
      },
    },
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
}); */

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#87c1f8",
    },
    secondary: {
      main: "#add5fa",
    },
    info: {
      main: "#0c71cf",
    },
    background: {
      default: "#e2f0fd",
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#edfffa",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#edfffa",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#edfffa",
        },
      },
    },
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
export default lightTheme;
