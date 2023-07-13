import { Box, Button, TextField, Theme, useTheme } from "@mui/material";
import logo from "./logo.png";
import client from "../../supabase/supabase";

function Inicio() {
  const theme: Theme = useTheme();
  console.log(theme);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: 5,
      }}
      maxWidth={{
        xs: "90%",
        sm: "90%",
        md: "60%",
        lg: "65%",
        xl: "70%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2.5,
          p: 5,
          backgroundColor: theme.palette.grey[700],
        }}
      >
        <TextField
          type='email'
          label='Email'
          variant='outlined'
          color='primary'
        />
        <TextField
          type='email'
          label='Password'
          variant='outlined'
          color='primary'
        />

        <Button variant='contained' color='primary'>
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
  );
}

export default Inicio;
