import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import useOrdersAction from "./useOrdersAction";
import CUSTOMER from "../../types/CUSTOMER";
import SELECTEDORDER from "../../types/SELECTEDORDER";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import { Add, Delete } from "@mui/icons-material";
import transformDate from "./utils/transformDate";
import ORDER from "../../types/ORDER";

interface HandleSubmitModificar {
  (
    products: PRODUCTLIST[],
    clientToModify: CUSTOMER,
    orderToModify: any,
    cantidades: (number | undefined)[],
    total: number
  ): void;
}

type ModalModificarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder: SELECTEDORDER[] | ORDER[];
  updateGrid: (data: any) => void;
  handleSubmitModificar: HandleSubmitModificar;
};

function ModalModificar({
  open,
  setOpen,
  selectedOrder,
  updateGrid,
  handleSubmitModificar,
}: ModalModificarProps) {
  const { customers, productList } = useOrdersAction({
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
  const [orderToModify, setOrderToModify] = useState<any>({
    cliente: "",
    cantidades: "",
    estado: "",
    fechaentrega: "",
    fecharealizado: "",
    idpedido: 0,
    productos: "",
    total: 0,
  });
  const [products, setProducts] = useState<PRODUCTLIST[]>([]);
  const [cantidades, setCantidades] = useState<(number | undefined)[]>([]);
  const [total, setTotal] = useState(0);

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...products];
    const updatedQuantities = [...cantidades];
    updatedQuantities.splice(index + 1, 0, 0);
    setCantidades(updatedQuantities);
    updatedProducts.splice(index + 1, 0, {
      nombre: "",
      quantity: 0,
      costo: 0,
      precio: 0,
    });
    setProducts(updatedProducts);
  };

  const resolveTotal = (value: number) => {
    setTotal(total + value);
    setOrderToModify({ ...orderToModify, total: total });
  };

  useEffect(() => {
    if (selectedOrder[0]) {
      const defaultDate = transformDate(
        selectedOrder[0].fechaentrega || new Date()
      );
      const order = { ...selectedOrder[0], fechaentrega: defaultDate };
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
        setProducts(coincidingProducts);

        const cantidadesArray = orderToModify.cantidades.split(",").map(Number);
        setCantidades(cantidadesArray);

        setTotal(orderToModify.total);
      }
    }
  }, [open, selectedOrder]);

  const handleEliminarInput = (
    index: number,
    precio: number,
    cantidad: number | undefined
  ) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    const updateQuantities = [...cantidades];
    updateQuantities.splice(index, 1);
    setCantidades(updateQuantities);

    if (cantidad) {
      const totalRestar = precio * cantidad;
      resolveTotal(-totalRestar);
    }
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
            {products.map((product: PRODUCTLIST, index: number) => (
              <Box key={index} sx={{ display: "flex", gap: 3 }}>
                <Autocomplete
                  disablePortal
                  style={{ width: "70%" }}
                  options={productList}
                  value={product}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      const updateProducts = [...products];
                      updateProducts[index].nombre = newValue.nombre;
                      updateProducts[index].precio = newValue.precio;
                      updateProducts[index].id = newValue.id;
                      setProducts(updateProducts);
                    }
                  }}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField {...params} label='Producto' />
                  )}
                />

                <TextField
                  label='Cantidad'
                  type='number'
                  value={cantidades[index]}
                  InputProps={{ inputProps: { min: -1, max: 10 } }}
                  onChange={(event) => {
                    const { value } = event.target;
                    const enteredValue = Number(value);
                    const updatedQuantities: any = [...cantidades];
                    if (enteredValue <= -1) {
                      updatedQuantities[index] = 0;
                      setCantidades(updatedQuantities);
                    } else {
                      const product = products[index];
                      const previousTotal =
                        product.precio * updatedQuantities[index];
                      const newQuantity = parseInt(value) || 0;
                      const newTotal = product.precio * newQuantity;
                      resolveTotal(newTotal - previousTotal);
                      updatedQuantities[index] = newQuantity;
                      setCantidades(updatedQuantities);
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />

                <Button
                  variant='outlined'
                  color='error'
                  size='small'
                  sx={{ marginLeft: "auto", borderRadius: 0 }}
                  onClick={() =>
                    handleEliminarInput(
                      index,
                      product.precio,
                      cantidades[index]
                    )
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
                  setClientToModify(value);
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
            <Button
              variant='contained'
              color='success'
              onClick={() =>
                handleSubmitModificar(
                  products,
                  clientToModify,
                  orderToModify,
                  cantidades,
                  total
                )
              }
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalModificar;
