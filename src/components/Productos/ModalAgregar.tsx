import React from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import styleModal from "./styleModal";
import { AttachMoney, BakeryDining, Paid } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import PRODUCT from "../../types/PRODUCT";

type ModalAgregarProps = {
  product: PRODUCT;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (product: PRODUCT) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ModalAgregar({
  product,
  isOpen,
  closeModal,
  handleSubmit,
  handleChange,
}: ModalAgregarProps) {
  const theme = useTheme();
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styleModal}>
        <Box
          className='headerModal'
          px={2}
          py={1}
          borderRadius={"10px 10px 0px 0px"}
          bgcolor={theme.palette.primary.main}
          color='theme.palette.success.contrastText'
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            fontWeight={600}
            component='h2'
          >
            Modificar Producto
          </Typography>
        </Box>
        <Box
          className='bodyModal'
          px={2}
          py={2}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          borderRadius={"0px 0px 10px 10px"}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              required
              variant='standard'
              value={product.nombre}
              name='nombre'
              onChange={handleChange}
              label='Nombre'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BakeryDining />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              variant='standard'
              name='precio'
              label='Precio'
              value={product.precio}
              onChange={handleChange}
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {" "}
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant='standard'
              label='Costo'
              name='costo'
              type='number'
              value={product.costo}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Paid />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
            <Button variant='contained' color='error' onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() => handleSubmit(product)}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalAgregar;
