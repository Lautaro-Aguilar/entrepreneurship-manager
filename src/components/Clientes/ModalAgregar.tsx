import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import styleModal from "./styleModal";
import { useTheme } from "@emotion/react";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import CUSTOMER from "../../types/CUSTOMER";

type ModalAgregarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalAgregar({ open, setOpen }: ModalAgregarProps) {
  const theme = useTheme();
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: ""
  })

  /* const handleSubmit = async (formData: CUSTOMER) => {
  } */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }
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
              <Button variant='contained' color='success'>
                <Typography variant='button'>Aceptar</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAgregar;
