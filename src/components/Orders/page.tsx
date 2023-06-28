import { useEffect, useState } from "react";
import { AlertColor, Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import buildColumns from "./agGrid/columns";
import ORDER from "../../types/ORDER";
import * as useCases from "../../services/orders.usecases";
import { SelectionChangedEvent } from "ag-grid-community";
import useSnackBar from "../shared/hooks/useSnackBar";
import SnackbarCustom from "../shared/SnackbarCustom";

function useOrders({
  openSnackBar,
  closeModal,
}: {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
  closeModal: () => void;
}) {
  const [orders, setOrders] = useState<ORDER[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ORDER[]>([]);

  useEffect(() => {
    useCases.getAll().then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleChangeSelection = (e: SelectionChangedEvent<ORDER>) => {
    setSelectedOrder(e.api.getSelectedRows());
  };

  return { orders, selectedOrder, handleChangeSelection };
  const updateGrid = (values: any) => {
    setOrders(values);
    openSnackBar("success", "Pedido agregado correctamente 👍");
    closeModal();
  };

  return { orders, selectedOrder, handleChangeSelection, updateGrid };
}

function Orders() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const columns = buildColumns();

  const closeModalAgregar = () => setOpenModalAgregar(false);

  const { openSnackBar, closeSnackBar, isSnackBarOpen, snackOptions } =
    useSnackBar();
  const { orders, handleChangeSelection, updateGrid, selectedOrder } = useOrders({
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
      <Typography variant='h3' component='h1'>
        Registro de Pedidos
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={orders}
            gridOptions={{ defaultColDef: { resizable: true, filter: true } }}
            onSelectionChanged={handleChangeSelection}
            rowSelection='multiple'
          />
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
      <ModalAgregar
        open={openModalAgregar}
        setOpen={setOpenModalAgregar}
        updateGrid={updateGrid}
      />
      <ModalModificar
        open={openModalModificar}
        setOpen={setOpenModalModificar}
        selectedOrder={selectedOrder}
      />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} />
    </Container>
  );
}

export default Orders;
