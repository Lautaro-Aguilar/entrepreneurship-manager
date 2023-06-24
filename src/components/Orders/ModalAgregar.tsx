import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Modal,
  Autocomplete,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material"
import styleModal from "./styleModal"
import { useTheme } from "@emotion/react"
import { Add, Delete } from "@mui/icons-material"
/* import orderUseCases from "../../services/orders.usecases" */
import * as customersUseCases from "../../services/customers.useCases"
import * as productsUseCases from "../../services/products.useCases"
import PRODUCT from "../../types/PRODUCT"
import CUSTOMER from "../../types/CUSTOMER"

type ModalAgregarProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Product = {
  name: string
  quantity: number
}

interface ProductList {
  name: string
  quantity: number
}

function useOrders() {
  const [products, setProducts] = useState<ProductList[]>([
    { name: "", quantity: 0 },
  ])

  const [productList, setProductList] = useState<PRODUCT[]>([])
  const [customers, setCustomers] = useState<CUSTOMER[]>([])

  useEffect(() => {
    productsUseCases.getAll().then(({ data }: { data: PRODUCT[] }) => {
      setProductList(data)
    })
    customersUseCases.getAll().then(({ data }: { data: CUSTOMER[] }) => {
      setCustomers(data)
    })
  }, [])

  return {
    products,
    setProducts,
    productList,
    customers,
  }
}

const renderAdditionalInputs = ({
  products,
  setProducts,
  productList,
}: {
  products: ProductList[]
  setProducts: any
  productList: PRODUCT[]
}) => {
  const handleEliminarInput = (index: number) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  }

  return products.slice(1).map((product: Product, index: number) => (
    <Box key={index} sx={{ display: "flex", gap: 3 }}>
      <Autocomplete
        disablePortal
        style={{ width: "70%" }}
        options={productList}
        /* value={() => {
          const selectedProduct = productList.find(
            (e) => e.nombre === product.name
          );
          if (selectedProduct) return selectedProduct;
          return productList[0];
        }} */
        getOptionLabel={(option) => option.nombre}
        onChange={(event, newValue) => {
          if (newValue) {
            const updatedProducts = [...products]
            updatedProducts[index + 1].name = newValue.nombre
            setProducts(updatedProducts)
          }
        }}
        renderInput={(params) => <TextField {...params} label='Producto' />}
      />

      <TextField
        label='Cantidad'
        type='number'
        value={product.quantity}
        onChange={(event) => {
          const updatedProducts = [...products]
          updatedProducts[index + 1].quantity =
            parseInt(event.target.value) || 0
          setProducts(updatedProducts)
        }}
      />

      <Button
        variant='outlined'
        color='error'
        size='small'
        sx={{ marginLeft: "auto", borderRadius: 0 }}
        onClick={() => handleEliminarInput(index + 1)}
      >
        <Delete fontSize='small' />
      </Button>
    </Box>
  ))
}
function ModalAgregar({ open, setOpen }: ModalAgregarProps) {
  const { products, setProducts, productList, customers } = useOrders()
  const handleClose = () => setOpen(false)
  const theme: any = useTheme()

  const handleAgregarInput = (index: number) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index + 1, 0, { name: "", quantity: 0 })
    setProducts(updatedProducts)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
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
            <Box sx={{ display: "flex", gap: 3 }}>
              <Autocomplete
                disablePortal
                style={{ width: "40%" }}
                options={productList}
                getOptionLabel={(option) => option.nombre}
                /* value={products[0].name} */
                /* onChange={(event, newValue) => {
                  const updatedProducts = [...products];
                  updatedProducts[0].name = newValue || "";
                  setProducts(updatedProducts);
                }} */
                renderInput={(params) => (
                  <TextField {...params} label='Producto' />
                )}
              />

              <TextField
                label='Cantidad'
                type='number'
                value={products[0].quantity}
                onChange={(event) => {
                  const updatedProducts = [...products]
                  updatedProducts[0].quantity =
                    parseInt(event.target.value) || 0
                  setProducts(updatedProducts)
                }}
              />
            </Box>

            {renderAdditionalInputs({ products, setProducts, productList })}

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
              InputLabelProps={{ shrink: true }}
            />

            <Box
              bgcolor={theme.palette.success.dark}
              display='flex'
              py={1}
              px={1}
              justifyContent='space-between'
            >
              <Typography
                variant='h5'
                component='h5'
                textTransform='uppercase'
                fontWeight='bold'
                display='inline-block'
              >
                Total
              </Typography>
              <Typography
                variant='h5'
                component='h5'
                fontWeight='bold'
                display='inline-block'
              >
                $1.500
              </Typography>
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
  )
}

export default ModalAgregar
