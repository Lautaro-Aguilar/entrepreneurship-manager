import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import PRODUCT from "../../types/PRODUCT";
import { getProducts } from "../../services/getProducts";

function useProducts() {
  const [products, setProducts] = useState<PRODUCT[]>([]);

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return { products };
}

function Productos() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const { products } = useProducts();

  const columnDefs = [
    { field: "id" },
    { field: "nombre" },
    { field: "precio" },
    { field: "costo" },
    { field: "inserted_at" },
  ];
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
        <Box className='ag-theme-alpine' style={{ height: 400, width: "100%" }}>
          <AgGridReact rowData={products} columnDefs={columnDefs} />
        </Box>

        <Box sx={{ display: "flex", my: 2, justifyContent: "space-around" }}>
          <Button
            variant='contained'
            size='large'
            onClick={() => setOpenModalAgregar(true)}
          >
            Agregar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={() => setOpenModalModificar(true)}
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
        open={openModalModificar}
        setOpen={setOpenModalModificar}
      />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} />
    </Container>
  );
}

export default Productos;
