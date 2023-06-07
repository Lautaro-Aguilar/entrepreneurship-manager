import { Box, Container } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalModificar from "./ModalModificar";
import buildColumns from "./agGrid/columns";
import Buttons from "./Buttons";
import useModifyClients from "./hooks/useModifyClients";
import useRemoveClients from "./hooks/useRemoveClients";
import useAddClient from "./hooks/useAddClient";
import useSnackBar from "../shared/hooks/useSnackBar";
import SnackbarCustom from "../shared/SnackbarCustom";

function Clientes() {
  const { closeSnackBar, isSnackBarOpen, openSnackBar, snackOptions } =
    useSnackBar();
  const {
    clients,
    closeModal,
    openModalModificar,
    selectedClient,
    handleUpdateClient,
    handleSubmitUpdate,
    updateClients,
  } = useModifyClients({ openSnackBar });

  const {
    isOpenModalAgregar,
    openModalAgregar,
    closeModalAgregar,
    handleSubmitAdd,
    formErrorAdd,
    setFormErrorAdd,
  } = useAddClient({ clients, updateClients, openSnackBar });

  const {
    handleRowsSelected,
    rowsSelected,
    handleDeleteRows,
    closeRemoveModal,
    isRemoveModalOpen,
    openRemoveModal,
  } = useRemoveClients({ updateClients, openSnackBar });

  const columns = buildColumns(handleUpdateClient);

  return (
    <Container
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SnackbarCustom
        closeSnackBar={closeSnackBar}
        isSnackBarOpen={isSnackBarOpen}
        message={snackOptions.message}
        variant={snackOptions.variant}
      />
      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={clients}
            columnDefs={columns}
            rowSelection='multiple'
            onRowSelected={(e) => handleRowsSelected(e)}
          />
        </Box>
        <Buttons
          setOpenModalAgregar={openModalAgregar}
          setOpenModalEliminar={openRemoveModal}
        />
      </Box>
      <ModalAgregar
        isOpen={isOpenModalAgregar}
        closeModal={closeModalAgregar}
        handleSubmitAdd={handleSubmitAdd}
        formError={formErrorAdd}
        setFormError={setFormErrorAdd}
      />
      <ModalEliminar
        isOpen={isRemoveModalOpen}
        closeModal={closeRemoveModal}
        clients={rowsSelected}
        handleRemoveSubmit={handleDeleteRows}
      />
      <ModalModificar
        isOpen={openModalModificar}
        closeModal={closeModal}
        profileToModify={selectedClient}
        handleSubmitUpdate={handleSubmitUpdate}
      />
    </Container>
  );
}

export default Clientes;
