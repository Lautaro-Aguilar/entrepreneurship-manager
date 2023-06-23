import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import buildColumns from "./agGrid/columns";


function useAddOrder() {

}

function Orders() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const columns = buildColumns()
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
        Registro de Pedidos
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact columnDefs={columns}></AgGridReact>
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

export default Orders;
