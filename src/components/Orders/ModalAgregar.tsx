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
import styleModal from "./styleModal";
import { useTheme } from "@emotion/react";
import { Add, Delete } from "@mui/icons-material";
/* import orderUseCases from "../../services/orders.usecases" */
import * as customersUseCases from "../../services/customers.useCases";
import * as productsUseCases from "../../services/products.useCases";
import PRODUCT from "../../types/PRODUCT";
import CUSTOMER from "../../types/CUSTOMER";

type ModalAgregarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ProductList extends PRODUCT {
  quantity?: number;
}

function useOrders() {
  const [products, setProducts] = useState<ProductList[]>([]);

  const [productList, setProductList] = useState<ProductList[]>([]);
  const [customers, setCustomers] = useState<CUSTOMER[]>([]);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubtotal] = useState(0);

  const resolveTotal = (value: number) => {
    setTotal(total + value);
  };

  const calcSubTotal = (newValue: number) => {
    setSubtotal(total - newValue);
  };

  useEffect(() => {
    productsUseCases.getAll().then(({ data }: { data: PRODUCT[] }) => {
      setProductList(data);
    });
    customersUseCases.getAll().then(({ data }: { data: CUSTOMER[] }) => {
      setCustomers(data);
    });
  }, []);

  return {
    products,
    setProducts,
    productList,
    customers,
    resolveTotal,
    total,
    subTotal,
    calcSubTotal,
  };
}

interface AdditionInputPropTypes {
  products: ProductList[];
  setProducts: any;
  productList: ProductList[];
  resolveTotal: (value: number) => void;
}

const renderAdditionalInputs = ({
  products,
  setProducts,
  productList,
  resolveTotal,
}: AdditionInputPropTypes) => {
  const handleEliminarInput = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return products.map((product: ProductList, index: number) => (
    <Box key={index} sx={{ display: "flex", gap: 3 }}>
      <Autocomplete
        disablePortal
        style={{ width: "70%" }}
        options={productList}
        value={product}
        getOptionLabel={(option) => option.nombre}
        onChange={(event, newValue) => {
          if (newValue) {
            console.log(newValue);
            const updatedProducts = [...products];
            updatedProducts[index].nombre = newValue.nombre;
            updatedProducts[index].precio = newValue.precio;
            setProducts(updatedProducts);
          }
        }}
        renderInput={(params) => <TextField {...params} label='Producto' />}
      />

      <TextField
        label='Cantidad'
        type='number'
        value={product.quantity}
        onChange={(event) => {
          const updatedProducts = [...products];
          const pr = updatedProducts[index];
          pr.quantity = parseInt(event.target.value) || 0;
          const total = pr.precio * pr.quantity;
          resolveTotal(total);
          setProducts(updatedProducts);
        }}
      />

      <Button
        variant='outlined'
        color='error'
        size='small'
        sx={{ marginLeft: "auto", borderRadius: 0 }}
        onClick={() => handleEliminarInput(index)}
      >
        <Delete fontSize='small' />
      </Button>
    </Box>
  ));
};

function ModalAgregar({ open, setOpen }: ModalAgregarProps) {
  const {
    products,
    setProducts,
    productList,
    customers,
    total,
    resolveTotal,
    subTotal,
    calcSubTotal,
  } = useOrders();
  const handleClose = () => setOpen(false);
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

  return (
    <div>
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
              getOptionLabel={(option) => option.nombre}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label='Cliente' />
              )}
            />

            <TextField
              label='Fecha de Entrega'
              type='datetime-local'
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label='Seña'
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                calcSubTotal(value);
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
                  ${total}
                </Typography>
              </Box>
            </Box>
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
                  SubTotal
                </Typography>
                <Typography
                  variant='h6'
                  component='h6'
                  fontWeight='bold'
                  display='inline-block'
                >
                  ${subTotal}
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
            <Button variant='contained' color='error'>
              Cancelar
            </Button>
            <Button variant='contained' color='success'>
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAgregar;
