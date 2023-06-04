import React, { useState } from 'react'
import { Box, Typography, Modal, Button, List, ListItem, ListItemText, Snackbar } from '@mui/material'
import styleModal from './styleModal';
import { useTheme } from '@emotion/react';
import CUSTOMER from '../../types/CUSTOMER';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as useCases from '../../services/customers.useCases'
type ModalEliminarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowsSelected: CUSTOMER[];
  setRefreshGrid: React.Dispatch<React.SetStateAction<boolean>>
};

function ModalEliminar({ open, setOpen, rowsSelected, setRefreshGrid }: ModalEliminarProps) {
  const theme = useTheme()
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = useState(false)

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const handleSubmit = async () => {
    for (const row of rowsSelected) {
      await useCases.destroy(row.id)
    }
    setRefreshGrid(true)
    setAlert(true)
    handleClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={styleModal}>
          <Box className="headerModal" px={2} py={1} borderRadius={"10px 10px 0px 0px"} bgcolor={theme.palette.error.dark} color="theme.palette.success.contrastText">
            <input type="button" value="test" onClick={() => console.log(rowsSelected)} />
            <Typography id="modal-modal-title" variant="h6" fontWeight={600} component="h2">
              Eliminar cliente
            </Typography>
          </Box>
          <Box className="bodyModal" px={2} py={2} sx={{ display: 'flex', flexDirection: 'column' }} borderRadius={"0px 0px 10px 10px"}>
            <Typography variant="h6" textAlign="start" component="h3">{rowsSelected.length > 1 ? "Vas a los siguientes usuarios: " : "Vas a eliminar el siguiente usuario:"}</Typography>
            <List>
              {rowsSelected?.map(({ nombre, apellido }, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    {nombre} {apellido}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" color="success" onClick={() => handleSubmit()}>
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Cliente eliminado correctamente!
        </Alert>
      </Snackbar>
    </div >
  )
}

export default ModalEliminar