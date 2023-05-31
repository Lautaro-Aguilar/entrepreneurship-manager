import React from 'react'
import { Box,Typography, Modal } from '@mui/material'
import styleModal from './styleModal';

type ModalEliminarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalEliminar({open, setOpen}: ModalEliminarProps) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modal Eliminar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalEliminar