import React, { useState } from 'react';
import { Box, Typography, Modal, Autocomplete, TextField, Button } from '@mui/material';
import styleModal from './styleModal';
import { useTheme } from "@emotion/react";
import { Add, Delete } from '@mui/icons-material';

type ModalAgregarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Product = {
  name: string;
  quantity: number;
};

function ModalAgregar({ open, setOpen }: ModalAgregarProps) {
  const [products, setProducts] = useState<Product[]>([
    { name: 'Producto inicial', quantity: 1 } // Producto por defecto
  ]);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index + 1, 0, { name: '', quantity: 0 });
    setProducts(updatedProducts);
  };

  const handleEliminarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <input type="button" value="test" onClick={() => console.log(products)} />
          <Box className="headerModal" px={2} py={1} borderRadius={"10px 10px 0px 0px"} bgcolor={theme.palette.success.main}
            color='theme.palette.success.contrastText'>
            <Typography
              id='modal-modal-title'
              variant='h6'
              fontWeight={600}
              component='h2'
            >
              Nuevo Pedido
            </Typography>
          </Box>

          <Box className="bodyModal" px={2} py={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} borderRadius={"0px 0px 10px 10px"}>
            {products.map((product, index) => (
              <Box key={index} sx={{ display: "flex", gap: 3 }}>
                <Autocomplete
                  disablePortal
                  style={{ width: '40%' }}
                  options={['asd']}
                  value={product.name}
                  onChange={(event, newValue) => {
                    const updatedProducts = [...products];
                    updatedProducts[index].name = newValue || '';
                    setProducts(updatedProducts);
                  }}
                  renderInput={(params) => <TextField {...params} label="Producto" />}
                />

                <TextField
                  label="Cantidad"
                  type="number"
                  value={product.quantity}
                  onChange={(event) => {
                    const updatedProducts = [...products];
                    updatedProducts[index].quantity = parseInt(event.target.value) || 0;
                    setProducts(updatedProducts);
                  }}
                />

                {index < products.length - 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
                    onClick={() => handleEliminarInput(index)}
                  >
                    <Delete />
                  </Button>
                )}
              </Box>
            ))}

            <Button
              variant='contained'
              color='success'
              size='large'
              fullWidth
              sx={{ borderRadius: 0 }}
              startIcon={<Add />}
              onClick={() => handleAgregarInput(products.length - 1)}
            >
              Agregar otro producto
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAgregar;