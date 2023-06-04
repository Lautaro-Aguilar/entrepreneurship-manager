import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import PRODUCT from "../../types/PRODUCT";
import * as useCases from "../../services/products.useCases";
import buildColumns from "./grid/columns";

function useProducts() {
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PRODUCT>({
    nombre: "",
    costo: 0,
    precio: 0,
  });

  const openModal = () => setOpenModalModificar(true);
  const closeModal = () => setOpenModalModificar(false);

  const handleUpdateProduct = (product: PRODUCT) => {
    setSelectedProduct(product);
    console.log(product);
    openModal();
  };

  const handleSubmitUpdate = (product: PRODUCT) => {
    useCases
      .update(product, product.id)
      .then((response) => console.log("producto actualizado", response));
  };

  useEffect(() => {
    useCases.getAll().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return {
    products,
    openModalModificar,
    openModal,
    closeModal,
    selectedProduct,
    handleUpdateProduct,
    handleSubmitUpdate,
  };
}

function Productos() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const {
    products,
    openModal,
    closeModal,
    openModalModificar,
    selectedProduct,
    handleUpdateProduct,
    handleSubmitUpdate,
  } = useProducts();

  const columns = buildColumns(handleUpdateProduct);

  return (
    <Container
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant='h3' component='h1'>
        Registro de Productos
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact rowData={products} columnDefs={columns} />
        </Box>

        <Box sx={{ display: "flex", my: 2, justifyContent: "space-around" }}>
          <Button
            variant='contained'
            color='info'
            size='large'
            onClick={() => setOpenModalAgregar(true)}
          >
            Agregar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={openModal}
          >
            Modificar
          </Button>
          <Button
            variant='contained'
            color='error'
            size='large'
            onClick={() => setOpenModalEliminar(true)}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
      <ModalAgregar open={openModalAgregar} setOpen={setOpenModalAgregar} />
      <ModalModificar
        isOpen={openModalModificar}
        closeModal={closeModal}
        productToModify={selectedProduct}
        handleSubmitUpdate={handleSubmitUpdate}
      />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} />
    </Container>
  );
}

export default Productos;
