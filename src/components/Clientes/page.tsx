import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalModificar from "./ModalModificar";
import CUSTOMER from "../../types/CUSTOMER";
import { getClients } from "../../services/getCustomers";
import buildColumns from "./agGrid/columns";
import Buttons from "./Buttons";

function Clientes() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [rowsSelected, setRowsSelected] = useState<CUSTOMER[]>([])
  const [profileToModify, setProfileToModify] = useState<CUSTOMER>()
  const [clients, setClients] = useState<CUSTOMER[]>([])

  const handleModificar = (profile: CUSTOMER) => {
    setProfileToModify(profile)
    setOpenModalModificar(true)
  }

  const columns = buildColumns(handleModificar)

  useEffect(() => {
    getClients().then((response) => {
      setClients(response.data)
    })
  }, [])

  return (
    <Container
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input type="button" value="test" onClick={() => console.log(rowsSelected)} />
      <Typography variant='h3' component='h1'>
        Registro de Clientes
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact rowData={clients} columnDefs={columns} rowSelection="multiple" onRowSelected={(e) => setRowsSelected(e.api.getSelectedRows())} />
        </Box>
        <Buttons setOpenModalAgregar={setOpenModalAgregar} setOpenModalEliminar={setOpenModalEliminar} />
      </Box>
      <ModalAgregar open={openModalAgregar} setOpen={setOpenModalAgregar} />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} rowsSelected={rowsSelected} />
      <ModalModificar open={openModalModificar} setOpen={setOpenModalModificar} profileToModify={profileToModify} />
    </Container>
  );
}

export default Clientes;
