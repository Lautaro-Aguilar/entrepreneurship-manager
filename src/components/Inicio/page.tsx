import { Alert, Box, Button, TextField, Theme, useTheme } from "@mui/material";
import imagen from "./imagen.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import SnackbarCustom from "../shared/SnackbarCustom";
import useSnackBar from "../shared/hooks/useSnackBar";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

function Inicio() {
  const navigate = useNavigate();
  const theme: Theme = useTheme();
  const palette = theme.palette;
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { closeSnackBar, isSnackBarOpen, snackOptions } = useSnackBar();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext && authContext.user !== null) {
      navigate("/pedidos");
    }
  }, [authContext]);

  const handleSignIn = async () => {
    await authContext?.signIn({
      email: loginData.email,
      password: loginData.password,
      setIsAlertActive,
      setAlertMessage,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <Box
      margin='0px auto'
      maxWidth={{
        xs: "90%",
        sm: "90%",
        md: "90%",
        lg: "65%",
        xl: "60%",
      }}
      maxHeight={{ xs: "300px", xl: "345px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
            xl: "row",
          },
          my: 5,
        }}
      >
        <Box
          sx={{
            borderRadius: "10px 0px 0px 10px",
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <img
            src={imagen}
            alt='Imagen de inicio de sesión'
            className='imagenLogin'
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2.5,
            p: 5,
            backgroundColor:
              palette.mode === "dark" ? palette.grey[900] : palette.grey[100],
            borderRadius: { xs: "10px", lg: "0px 10px 10px 0px" },
            minWidth: "55%",
          }}
          maxHeight={{ xs: "300px", xl: "350px" }}
        >
          {isAlertActive && (
            <Alert
              variant='filled'
              sx={{
                height: "80px",
                textAlign: "center",
                alignItems: "center",
                fontSize: 20,
              }}
              severity='error'
            >
              {alertMessage}
            </Alert>
          )}
          <TextField
            type='email'
            label='Correo electrónico'
            name='email'
            onChange={(event) => handleChange(event)}
            variant='outlined'
            InputLabelProps={{
              style: { fontWeight: 500 },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.primary.main,
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.primary.main,
                },
            }}
            color='primary'
          />
          <TextField
            type='password'
            label='Contraseña'
            name='password'
            onChange={(event) => handleChange(event)}
            variant='outlined'
            color='primary'
            InputLabelProps={{
              style: { fontWeight: 500 },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.primary.main,
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.primary.main,
                },
            }}
          />
          <Button
            variant='contained'
            sx={{ display: "inline-block", width: "50%", margin: "0px auto" }}
            color='primary'
            onClick={handleSignIn}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
      <SnackbarCustom
        isSnackBarOpen={isSnackBarOpen}
        closeSnackBar={closeSnackBar}
        message={snackOptions.message}
        variant={snackOptions.variant}
      />
    </Box>
  );
}

export default Inicio;
