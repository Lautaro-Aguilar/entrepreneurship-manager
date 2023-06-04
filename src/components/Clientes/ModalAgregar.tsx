import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  InputAdornment,
  Snackbar
} from "@mui/material";
import styleModal from "./styleModal";
import { useTheme } from "@emotion/react";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import CUSTOMER from "../../types/CUSTOMER";
import * as useCases from "../../services/customers.useCases"
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type ModalAgregarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshGrid: React.Dispatch<React.SetStateAction<boolean>>
};

function ModalAgregar({ open, setOpen, setRefreshGrid }: ModalAgregarProps) {
  const theme = useTheme();
  const [alert, setAlert] = useState(false)
  const [formError, setFormError] = useState(false)
  const [formData, setFormData] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: ""
  })

  const handleClose = () => {
    setFormError(false)
    setOpen(false)
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = async (formData: CUSTOMER) => {
    if (formData.nombre === "" || formData.apellido === "") {
      setFormError(true)
      return;
    }
    useCases.create(formData).then((response) => {
      setRefreshGrid(true)
      setFormData({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: ""
      })
    })
    setAlert(true)
    handleClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormError(false)
    console.log(formData)
  }


  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <Box
            className='headerModal'
            px={2}
            py={1}
            borderRadius={"10px 10px 0px 0px"}
            bgcolor={theme.palette.success.main}
            color='theme.palette.success.contrastText'
          >
            <Typography
              id='modal-modal-title'
              variant='h6'
              fontWeight={600}
              component='h2'
            >
              Nuevo cliente
            </Typography>
          </Box>
          <Box
            className='bodyModal'
            px={2}
            py={2}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            borderRadius={"0px 0px 10px 10px"}
          >
            {formError && (
              <Alert severity="error" sx={{ alignItems: 'center' }}>Los campos Nombre y Apellido son obligatorios.</Alert>
            )}
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                required
                name="nombre"
                label='Nombre'
                variant='standard'
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="apellido"
                label='Apellido'
                variant='standard'
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <TextField
              name="direccion"
              label='Direccion'
              variant='standard'
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MapIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name='telefono'
              label='Telefono'
              variant='standard'
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
              <Button variant='contained' color='error' onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant='contained' color='success' onClick={() => { handleSubmit(formData) }}>
                <Typography variant='button'>Aceptar</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Cliente agregado correctamente!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ModalAgregar;
