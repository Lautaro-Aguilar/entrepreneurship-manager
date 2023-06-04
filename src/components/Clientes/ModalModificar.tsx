import React, { useEffect, useState } from 'react'
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
  profileToModify: CUSTOMER | undefined
};


function ModalModificar({ open, setOpen, profileToModify }: ModalModificarProps) {
  const [formData, setFormData] = useState<CUSTOMER>({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  })
  const handleClose = () => setOpen(false);
  const theme = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    if (profileToModify) {
      setFormData({
        nombre: profileToModify?.nombre,
        apellido: profileToModify?.apellido,
        direccion: profileToModify?.direccion,
        telefono: profileToModify?.telefono,
      })
    }
  }, [open])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
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
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
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
                name="apellido"
                label="Apellido"
                value={formData.apellido}
                onChange={handleChange}
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
              name="direccion"
              label="Direccion"
              value={formData.direccion}
              onChange={handleChange}
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
              name="telefono"
              label="Telefono"
              value={formData.telefono}
              onChange={handleChange}
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