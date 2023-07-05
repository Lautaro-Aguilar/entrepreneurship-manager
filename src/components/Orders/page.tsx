import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import buildColumns from "./agGrid/columns";
import * as useCases from "../../services/orders.usecases";
import useSnackBar from "../shared/hooks/useSnackBar";
import SnackbarCustom from "../shared/SnackbarCustom";
import SELECTEDORDER from "../../types/SELECTEDORDER";
import ModalEstado from "./ModalEstado";
import useOrders from "./useOrders";

function Orders() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEstado, setOpenModalEstado] = useState(true);
  const [rowsSelected, setRowsSelected] = useState<SELECTEDORDER[]>([]);
  const columns = buildColumns();

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteOrders = (orders: SELECTEDORDER[]) => {
    const promises = orders.map((order) => {
      return new Promise((resolve, reject) => {
        useCases.destroy(order.idpedido).then((response) => {
          resolve(response);
        });
      });
    });

    Promise.all(promises).then((resultados) => {
      useCases.getAll().then(({ data }) => {
        updateDeleteGrid(data);
        setOpenModalEliminar(false);
        openSnackBar("success", "Pedido removido correctamente 👍");
      });
    });
  };

  const closeModalAgregar = () => setOpenModalAgregar(false);

  const handleCloseModalEstado = () => setOpenModalEstado(false);

  const { openSnackBar, closeSnackBar, isSnackBarOpen, snackOptions } =
    useSnackBar();

  const {
    orders,
    handleChangeSelection,
    updateGrid,
    selectedOrder,
    updateDeleteGrid,
  } = useOrders({
    openSnackBar,
    closeModal: closeModalAgregar,
  });

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
        isSnackBarOpen={isSnackBarOpen}
        closeSnackBar={closeSnackBar}
        message={snackOptions.message}
        variant={snackOptions.variant}
      />
      <Typography variant='h2' fontWeight='700' color='primary'>
        Pedidos
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowMultiSelectWithClick
            columnDefs={columns}
            rowData={orders}
            gridOptions={{ defaultColDef: { resizable: true, filter: true } }}
            onSelectionChanged={handleChangeSelection}
            rowSelection='multiple'
            onRowSelected={handleRowsSelected}
          />
        </Box>

        <Box sx={{ display: "flex", my: 2, justifyContent: "space-around" }}>
          <Button
            variant='contained'
            color='success'
            size='large'
            onClick={() => setOpenModalAgregar(true)}
          >
            Agregar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disabled={
              selectedOrder.length > 0 && rowsSelected.length < 2 ? false : true
            }
            size='large'
            onClick={() => {
              setOpenModalModificar(true);
            }}
          >
            Modificar
          </Button>
          <Button
            variant='contained'
            color='info'
            disabled={rowsSelected.length < 1}
            size='large'
            onClick={() => setOpenModalEliminar(true)}
          >
            Cambiar Estado
          </Button>
          <Button
            variant='contained'
            color='error'
            disabled={rowsSelected.length < 1}
            size='large'
            onClick={() => setOpenModalEliminar(true)}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
      <ModalAgregar
        open={openModalAgregar}
        setOpen={setOpenModalAgregar}
        updateGrid={updateGrid}
      />
      <ModalModificar
        open={openModalModificar}
        setOpen={setOpenModalModificar}
        selectedOrder={selectedOrder}
        updateGrid={updateGrid}
      />
      <ModalEliminar
        open={openModalEliminar}
        setOpen={setOpenModalEliminar}
        orders={rowsSelected}
        handleRemoveSubmit={handleDeleteOrders}
      />
      <ModalEstado
        open={openModalEstado}
        pedidos={rowsSelected}
        handleClose={handleCloseModalEstado}
        handleSubmit={() => console.log("submit")}
      />
    </Container>
  );
}

export default Orders;
