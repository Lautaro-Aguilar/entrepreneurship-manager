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
import SELECTEDORDER from "../../types/SELECTEDORDER";

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

  const updateGrid = (response: any) => {
    if (response.errors !== null) {
      openSnackBar("error", "Hubo un error al agregar el pedido 😞")
      closeModal();
    } else {
      setOrders(response.data);
      openSnackBar("success", "Pedido agregado correctamente 👍");
      closeModal();
    }
  };

  const updateDeleteGrid = (data: any) => {
    setOrders(data);
    openSnackBar("success", "Pedido agregado correctamente 👍");
    closeModal();
  }

  return { orders, selectedOrder, handleChangeSelection, updateGrid, updateDeleteGrid };
}

function Orders() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [rowsSelected, setRowsSelected] = useState<SELECTEDORDER[]>([])
  const columns = buildColumns();

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteOrders = (orders: SELECTEDORDER[]) => {
    const promises = orders.map((order) => {
      return new Promise((resolve, reject) => {
        useCases.destroy(order.idpedido).then((response) => {
          resolve(response)
        })
      })
    })

    Promise.all(promises).then((resultados) => {
      useCases.getAll().then(({ data }) => {
        updateDeleteGrid(data)
        setOpenModalEliminar(false)
        openSnackBar("success", "Pedido removido correctamente 👍")
      })
    })
  }

  const closeModalAgregar = () => setOpenModalAgregar(false);

  const { openSnackBar, closeSnackBar, isSnackBarOpen, snackOptions } =
    useSnackBar();
  const { orders, handleChangeSelection, updateGrid, selectedOrder, updateDeleteGrid } =
    useOrders({
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
            onRowSelected={(e) => handleRowsSelected(e)}
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
            disabled={selectedOrder.length > 0 ? false : true}
            size='large'
            onClick={() => { setOpenModalModificar(true) }}
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
        updateGrid={updateGrid}
      />
      <ModalEliminar open={openModalEliminar} setOpen={setOpenModalEliminar} orders={rowsSelected} handleRemoveSubmit={handleDeleteOrders} />
    </Container>
  );
}

export default Orders;
