import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Autocomplete,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import useOrders from "./useOrders";
import CUSTOMER from "../../types/CUSTOMER";
import SELECTEDORDER from "../../types/SELECTEDORDER";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import { Add, Delete } from "@mui/icons-material";
import REQUESTORDER from "../../types/REQUESTORDER";
import * as orderUseCases from "../../services/orders.usecases";


type ModalModificarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder: SELECTEDORDER[];
  updateGrid: (data: any) => void;
};

function ModalModificar({
  open,
  setOpen,
  selectedOrder,
  updateGrid,
}: ModalModificarProps) {
  const { customers, productList } = useOrders({
    open,
    updateGrid,
  });
  const theme: any = useTheme();
  const handleClose = () => setOpen(false);
  const [clientToModify, setClientToModify] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  });
  const [orderToModify, setOrderToModify] = useState<SELECTEDORDER>({
    cliente: "",
    cantidades: "",
    estado: "",
    fechaentrega: "",
    fecharealizado: "",
    idpedido: 0,
    productos: "",
    sena: 0,
    total: 41,
  });
  const [coincidingProducts, setCoincidingProducts] = useState<PRODUCTLIST[]>([]);
  const [cantidades, setCantidades] = useState<(number | undefined)[]>([])

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...coincidingProducts];
    const updatedQuantities = [...cantidades]
    updatedQuantities.splice(index + 1, 0, 1)
    setCantidades(updatedQuantities)
    updatedProducts.splice(index + 1, 0, {
      nombre: "",
      quantity: 0,
      costo: 0,
      precio: 0,
    });
    setCoincidingProducts(updatedProducts);
  };

  function padZero(value: any) {
    return value.toString().padStart(2, '0');
  }

  const transformDate = (date: string | Date) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = padZero(dateObj.getMonth() + 1);
    const day = padZero(dateObj.getDate());
    const hours = padZero(dateObj.getHours());
    const minutes = padZero(dateObj.getMinutes());

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDate
  }

  useEffect(() => {
    if (selectedOrder[0]) {
      const defaultDate = transformDate(selectedOrder[0].fechaentrega)
      const order = { ...selectedOrder[0], fechaentrega: defaultDate }
      setOrderToModify(order);

      if (orderToModify) {
        const clienteAModificar = customers.find(
          (customer) =>
            `${customer.nombre} ${customer.apellido}` === orderToModify.cliente
        );
        setClientToModify(
          clienteAModificar || {
            nombre: "",
            apellido: "",
            direccion: "",
            telefono: "",
          }
        );

        const coincidingProducts = productList.filter((producto) =>
          orderToModify.productos.includes(producto.nombre)
        );
        setCoincidingProducts(coincidingProducts);

        const cantidadesArray = orderToModify.cantidades.split(",").map(Number);
        setCantidades(cantidadesArray)
      }
    }
  }, [open, selectedOrder]);

  const handleEliminarInput = (
    index: number,
    precio: number,
    cantidad: number | undefined
  ) => {
    const updatedProducts = [...coincidingProducts];
    updatedProducts.splice(index, 1);
    setCoincidingProducts(updatedProducts);
    const updateQuantities = [...cantidades]
    updateQuantities.splice(index, 1)
    setCantidades(updateQuantities)

    /*     if (cantidad) {
          const totalRestar = precio * cantidad;
          resolveTotal(-totalRestar);
        } */
  };

  const handleSubmit = () => {
    const arrayidsproductos = coincidingProducts.map((prod) => prod.id)
    const request: REQUESTORDER = {
      idcliente: clientToModify.id,
      arrayidsproductos,
      arraydecantidad: cantidades,
      fechaentrega: orderToModify.fechaentrega,
      sena: orderToModify.sena,
      total: 0,
      estado: "Pendiente"
    }
    console.log(request)
    /*  orderUseCases.update(request, orderToModify.idpedido).then((response) => {
       const newOrder = response.data
       updateGrid(newOrder)
     }) */
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
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
              Modificar Pedido
            </Typography>
          </Box>

          <Box
            className='bodyModal'
            px={2}
            py={2}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            borderRadius={"0px 0px 10px 10px"}
          >
            {coincidingProducts.map((product: PRODUCTLIST, index: number) => (
              <Box key={index} sx={{ display: 'flex', gap: 3 }}>
                <Autocomplete
                  disablePortal
                  style={{ width: "70%" }}
                  options={productList}
                  value={product}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      const updateProducts = [...coincidingProducts]
                      updateProducts[index].nombre = newValue.nombre
                      updateProducts[index].precio = newValue.precio
                      updateProducts[index].id = newValue.id
                      setCoincidingProducts(updateProducts)
                    }
                  }}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField {...params} label='Producto' />}
                />

                <TextField
                  label="Cantidad"
                  type="number"
                  value={cantidades[index]}
                  onChange={(event) => {
                    const { value } = event.target
                    const updatedQuantities = [...cantidades]
                    updatedQuantities[index] = Number(value)
                    setCantidades(updatedQuantities)
                  }}
                  InputLabelProps={{ shrink: true }} />

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
            ))}
            <Autocomplete
              disablePortal
              options={customers}
              value={clientToModify}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.nombre} {option.apellido}
                  </li>
                );
              }}
              getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
              fullWidth
              onChange={(event, value) => {
                if (value) {
                  setClientToModify(value)
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label='Cliente' />
              )}
            />

            <TextField
              label='Fecha de Entrega'
              type='datetime-local'
              InputLabelProps={{ shrink: true }}
              value={orderToModify.fechaentrega}
              onChange={(e) => {
                setOrderToModify({
                  ...orderToModify,
                  fechaentrega: e.target.value,
                });
              }}
            />

            <TextField
              label='Seña'
              type='number'
              value={orderToModify.sena}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const { value } = e.target
                setOrderToModify({ ...orderToModify, sena: Number(value) });
              }}
              InputLabelProps={{ shrink: true }}
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
                  ${orderToModify.total}
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
              onClick={() => handleAgregarInput(coincidingProducts.length - 1)}
            >
              Agregar producto
            </Button>
          </Box>
          <Box display='flex' justifyContent='flex-end' gap={2} mr={2} mb={2}>
            <Button variant='contained' color='error'>
              Cancelar
            </Button>
            <Button variant='contained' color='success' onClick={handleSubmit}>
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalModificar;
