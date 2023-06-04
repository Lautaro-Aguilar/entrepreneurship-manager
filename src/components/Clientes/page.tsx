import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalModificar from "./ModalModificar";
import CUSTOMER from "../../types/CUSTOMER";
import buildColumns from "./agGrid/columns";
import Buttons from "./Buttons";
import * as useCases from "../../services/customers.useCases"

function Clientes() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [rowsSelected, setRowsSelected] = useState<CUSTOMER[]>([])
  const [profileToModify, setProfileToModify] = useState<CUSTOMER>()
  const [clients, setClients] = useState<CUSTOMER[]>([])
  const [refreshGrid, setRefreshGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const handleModificar = (profile: CUSTOMER) => {
    setProfileToModify(profile)
    setOpenModalModificar(true)
  }

  const columns = buildColumns(handleModificar)

  useEffect(() => {
    useCases.getAll().then((response) => {
      setClients(response.data)
      setRefreshGrid(false);
    })
  }, [refreshGrid])

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
        Registro de Clientes
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact key={refreshGrid} rowData={clients} columnDefs={columns} rowSelection="multiple" onRowSelected={(e) => setRowsSelected(e.api.getSelectedRows())} />
        </Box>
        <Buttons setOpenModalAgregar={setOpenModalAgregar} setOpenModalEliminar={setOpenModalEliminar} />
      </Box>
      <ModalAgregar open={openModalAgregar} setOpen={setOpenModalAgregar} setRefreshGrid={setRefreshGrid} />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} rowsSelected={rowsSelected} setRefreshGrid={setRefreshGrid} />
      <ModalModificar open={openModalModificar} setOpen={setOpenModalModificar} profileToModify={profileToModify} />
    </Container>
  );
}

export default Clientes;
