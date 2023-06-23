import React, { useState } from 'react';
import { Box, Typography, Modal, Autocomplete, TextField, Button, InputAdornment } from '@mui/material';
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

function useOrders() {
  const [products, setProducts] = useState([{ name: 'Producto inicial', quantity: 1 }])
  return {
    products,
    setProducts
  }
}

const renderAdditionalInputs = ({ products, setProducts }: any) => {
  const handleEliminarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return products.slice(1).map((product: Product, index: number) => (
    <Box key={index} sx={{ display: "flex", gap: 3 }}>
      <Autocomplete
        disablePortal
        style={{ width: '70%' }}
        options={['asd']}
        value={product.name}
        onChange={(event, newValue) => {
          const updatedProducts = [...products];
          updatedProducts[index + 1].name = newValue || '';
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
          updatedProducts[index + 1].quantity = parseInt(event.target.value) || 0;
          setProducts(updatedProducts);
        }}
      />

      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ marginLeft: 'auto', borderRadius: 0 }}
        onClick={() => handleEliminarInput(index + 1)}
      >
        <Delete fontSize='small' />
      </Button>
    </Box>
  ));
};
function ModalAgregar({ open, setOpen }: ModalAgregarProps) {
  const { products, setProducts } = useOrders()
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index + 1, 0, { name: '', quantity: 0 });
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
            <Box sx={{ display: "flex", gap: 3 }}>
              <Autocomplete
                disablePortal
                style={{ width: '40%' }}
                options={['asd']}
                value={products[0].name}
                onChange={(event, newValue) => {
                  const updatedProducts = [...products];
                  updatedProducts[0].name = newValue || '';
                  setProducts(updatedProducts);
                }}
                renderInput={(params) => <TextField {...params} label="Producto" />}
              />

              <TextField
                label="Cantidad"
                type="number"
                value={products[0].quantity}
                onChange={(event) => {
                  const updatedProducts = [...products];
                  updatedProducts[0].quantity = parseInt(event.target.value) || 0;
                  setProducts(updatedProducts);
                }}
              />
            </Box>

            {renderAdditionalInputs({ products, setProducts })}

            <Autocomplete
              disablePortal
              options={['juan']}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Cliente" />}
            />

            <TextField
              label="Fecha de Entrega"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Seña"
              type="number"
              InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              InputLabelProps={{ shrink: true }}
            />

            <Box bgcolor={theme.palette.success.dark} py={1}>
              <Typography variant='h5' component="h2" textAlign="center" textTransform="uppercase" fontWeight="bold">Total: $1.500</Typography>
            </Box>
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