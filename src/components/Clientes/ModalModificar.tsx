import React, { useState } from 'react'
import { Box, Typography, Modal, Button, TextField, InputAdornment } from '@mui/material'
import styleModal from './styleModal';
import { useTheme } from '@emotion/react';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import CUSTOMER from '../../types/CUSTOMER';

type ModalModificarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  perfilToModify: CUSTOMER | undefined
};


function ModalModificar({ open, setOpen, perfilToModify }: ModalModificarProps) {
  const [formData, setFormData] = useState({
    nombre: perfilToModify?.nombre,
    apellido: perfilToModify?.apellido,
    direccion: perfilToModify?.direccion,
    telefono: perfilToModify?.telefono,
  })
  const handleClose = () => setOpen(false);
  const theme = useTheme()
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <input type="button" value="test" onClick={() => console.log(formData)} />
          <Box className="headerModal" px={2} py={1} borderRadius={"10px 10px 0px 0px"} bgcolor={theme.palette.primary.main} color="theme.palette.success.contrastText">
            <Typography id="modal-modal-title" variant="h6" fontWeight={600} component="h2">
              Modificar cliente
            </Typography>
          </Box>
          <Box className="bodyModal" px={2} py={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} borderRadius={"0px 0px 10px 10px"}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                required
                variant='standard'
                label="Nombre"
                value={formData.nombre}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                variant='standard'
                label="Apellido"
                value={formData.apellido}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <TextField
              variant='standard'
              label="Direccion"
              value={formData.direccion}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              variant='standard'
              label="Telefono"
              value={formData.telefono}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" color="success">
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div >
  )
}

export default ModalModificar