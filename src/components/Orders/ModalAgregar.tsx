import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Autocomplete,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import useOrders from "./useOrdersAction";

type ModalAgregarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateGrid: (values: any) => void;
};

interface AdditionInputPropTypes {
  products: PRODUCTLIST[];
  setProducts: any;
  productList: PRODUCTLIST[];
  resolveTotal: (value: number) => void;
}

const renderAdditionalInputs = ({
  products,
  setProducts,
  productList,
  resolveTotal,
}: AdditionInputPropTypes) => {
  const handleEliminarInput = (
    index: number,
    precio: number,
    cantidad: number | undefined
  ) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);

    if (cantidad) {
      const totalRestar = precio * cantidad;
      resolveTotal(-totalRestar);
    }
  };

  return products.map((product: PRODUCTLIST, index: number) => (
    <Box key={index} sx={{ display: "flex", gap: 3 }}>
      <Autocomplete
        disablePortal
        style={{ width: "70%" }}
        options={productList}
        value={product}
        getOptionLabel={(option) => option.nombre}
        onChange={(_event, newValue) => {
          if (newValue) {
            const updatedProducts = [...products];
            updatedProducts[index].nombre = newValue.nombre;
            updatedProducts[index].precio = newValue.precio;
            updatedProducts[index].id = newValue.id;
            setProducts(updatedProducts);
          }
        }}
        renderInput={(params) => <TextField {...params} label='Producto' />}
      />

      <TextField
        label='Cantidad'
        type='number'
        value={product.quantity}
        InputProps={{ inputProps: { min: -1, max: 10 } }}
        onChange={(event) => {
          const updatedProducts = [...products];
          const pr = updatedProducts[index];
          const enteredValue = Number(event.target.value);

          if (enteredValue <= -1) {
            pr.quantity = 0; // Establecer el valor como 0 si es igual o menor a -1
          } else {
            if (pr.quantity !== undefined) {
              const previousTotal = pr.precio * pr.quantity;
              pr.quantity = parseInt(event.target.value) || 0;
              const newTotal = pr.precio * pr.quantity;
              resolveTotal(newTotal - previousTotal);
            }
          }

          setProducts(updatedProducts);
        }}
      />

      <Button
        variant='outlined'
        color='error'
        size='small'
        sx={{ marginLeft: "auto", borderRadius: 0 }}
        onClick={() =>
          handleEliminarInput(index, product.precio, product.quantity)
        }
      >
        <Delete fontSize='small' />
      </Button>
    </Box>
  ));
};

function ModalAgregar({ open, setOpen, updateGrid }: ModalAgregarProps) {
  const {
    products,
    setProducts,
    productList,
    customers,
    total,
    setTotal,
    resolveTotal,
    formDataOrder,
    setFormDataOrder,
    handleSubmit,
  } = useOrders({ open, updateGrid });
  const handleClose = () => {
    setOpen(false);
    setTotal(0);
  };
  const theme: any = useTheme();

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index + 1, 0, {
      nombre: "",
      quantity: 0,
      costo: 0,
      precio: 0,
    });
    setProducts(updatedProducts);
  };

  const currentDate = new Date().toISOString().slice(0, 16);
  const [fechaEntregaDefault, setFechaEntregaDefault] = useState(currentDate);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 5,
        }}
      >
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
            Nuevo Pedido
          </Typography>
        </Box>

        <Box
          className='bodyModal'
          px={2}
          py={2}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          borderRadius={"0px 0px 10px 10px"}
        >
          {renderAdditionalInputs({
            products,
            setProducts,
            productList,
            resolveTotal,
          })}

          <Autocomplete
            disablePortal
            options={customers}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.nombre}
                </li>
              );
            }}
            getOptionLabel={(option) => option.nombre}
            fullWidth
            onChange={(_event, value) => {
              setFormDataOrder({ ...formDataOrder, idcliente: value?.id });
            }}
            renderInput={(params) => <TextField {...params} label='Cliente' />}
          />

          <TextField
            label='Fecha de Entrega'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
            value={fechaEntregaDefault}
            onChange={(e) => {
              setFechaEntregaDefault(e.target.value);
              setFormDataOrder({
                ...formDataOrder,
                fechaentrega: e.target.value,
              });
            }}
          />

          <Box
            bgcolor={theme.palette.success.dark}
            display='flex'
            py={1}
            px={1}
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box display='flex' justifyContent='space-between'>
              <Typography
                variant='h6'
                component='h6'
                textTransform='uppercase'
                fontWeight='bold'
                display='inline-block'
              >
                Total
              </Typography>
              <Typography
                variant='h6'
                component='h6'
                fontWeight='bold'
                display='inline-block'
              >
                ${total}
              </Typography>
            </Box>
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
            Agregar producto
          </Button>
        </Box>
        <Box display='flex' justifyContent='flex-end' gap={2} mr={2} mb={2}>
          <Button variant='contained' color='error' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' color='success' onClick={handleSubmit}>
            Aceptar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalAgregar;
