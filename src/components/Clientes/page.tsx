import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalModificar from "./ModalModificar";
import buildColumns from "./agGrid/columns";
import Buttons from "./Buttons";
import useModifyClients from "./hooks/useModifyClients";
import useRemoveClients from "./hooks/useRemoveClients";
import useAddClient from "./hooks/useAddClient";
import SnackbarAlert from "./utils/Snackbar";

function Clientes() {
  const {
    clients, closeModal, openModalModificar, selectedClient, handleUpdateClient, handleSubmitUpdate, closeSnackBar, isSnackBarOpen, updateClients
  } = useModifyClients()

  const {
    isOpenModalAgregar,
    openModalAgregar,
    closeModalAgregar,
    handleSubmitAdd,
    isSnackBarOpenAdd,
    closeSnackBarAdd
  } = useAddClient({ clients, updateClients })


  const {
    handleRowsSelected,
    rowsSelected,
    handleDeleteRows,
    closeRemoveModal,
    isRemoveModalOpen,
    openRemoveModal,
    isRemoveSnackBarOpen,
    closeRemoveSnackBar
  } = useRemoveClients({ updateClients })

  const columns = buildColumns(handleUpdateClient)

  return (
    <Container
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Snackbar open={isSnackBarOpenAdd} autoHideDuration={6000} onClose={closeSnackBarAdd}>
        <Alert onClose={closeSnackBarAdd} severity="success" sx={{ width: "100%" }}>
          Producto añadido correctamente 👍
        </Alert>
      </Snackbar>

      <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert onClose={closeSnackBar} severity="success" sx={{ width: "100%" }}>
          Producto modificado correctamente 👍
        </Alert>
      </Snackbar>

      {/*  <Snackbar open={isRemoveModalOpen} autoHideDuration={6000} onClose={closeRemoveSnackBar}>
        <Alert onClose={closeRemoveSnackBar} severity="success" sx={{ width: "100%" }}>
          Producto Eliminado correctamente 👍
        </Alert>
      </Snackbar> */}

      <SnackbarAlert mensaje="Producto Eliminado Correctamente 👍" isRemoveSnackBarOpen={isRemoveSnackBarOpen} closeRemoveSnackBar={closeRemoveSnackBar} />
      <Typography variant='h3' component='h1'>
        Registro de Clientes
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={clients}
            columnDefs={columns}
            rowSelection="multiple"
            onRowSelected={(e) => handleRowsSelected(e)}
          />
        </Box>
        <Buttons setOpenModalAgregar={openModalAgregar} setOpenModalEliminar={openRemoveModal} />
      </Box>
      <ModalAgregar isOpen={isOpenModalAgregar} closeModal={closeModalAgregar} handleSubmitAdd={handleSubmitAdd} />
      <ModalEliminar isOpen={isRemoveModalOpen} closeModal={closeRemoveModal} clients={rowsSelected} handleRemoveSubmit={handleDeleteRows} />
      <ModalModificar isOpen={openModalModificar} closeModal={closeModal} profileToModify={selectedClient} handleSubmitUpdate={handleSubmitUpdate} />
    </Container>
  );
}

export default Clientes;
