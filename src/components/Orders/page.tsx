import { useContext, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
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
import Cards from "./Cards";
import { ExpandMore } from "@mui/icons-material";
import { AuthContext } from "../Inicio/AuthProvider";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const Expandir = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} color='primary' />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Orders() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEstado, setOpenModalEstado] = useState(false);
  const [rowsSelected, setRowsSelected] = useState<SELECTEDORDER[]>([]);
  const columns = buildColumns();
  const authContext = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);
  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteOrders = (orders: SELECTEDORDER[]) => {
    const orderIDs = orders.map((order) => {
      return order.idpedido;
    });
    useCases.destroy(orderIDs).then((response) => {
      updateDeleteGrid(response);
    });
  };

  const closeModalAgregar = () => setOpenModalAgregar(false);

  const handleCloseModalEstado = () => setOpenModalEstado(false);

  const handleCloseModalModificar = () => setOpenModalModificar(false);

  const { openSnackBar, closeSnackBar, isSnackBarOpen, snackOptions } =
    useSnackBar();

  console.log(AuthContext);
  const {
    orders,
    handleChangeSelection,
    updateGrid,
    selectedOrder,
    updateDeleteGrid,
    openModalEliminar,
    setOpenModalEliminar,
    handleUpdateStateOrder,
    handleSubmitModificar,
  } = useOrders({
    openSnackBar,
    closeModal: closeModalAgregar,
    closeModalEstado: handleCloseModalEstado,
    closeModalModificar: handleCloseModalModificar,
  });

  return (
    <>
      <Container
        maxWidth='lg'
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
              rowData={authContext?.user !== null ? orders : undefined}
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
                selectedOrder.length > 0 && rowsSelected.length < 2
                  ? false
                  : true
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
              onClick={() => setOpenModalEstado(true)}
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
          handleSubmitModificar={handleSubmitModificar}
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
          handleSubmit={() => handleUpdateStateOrder(rowsSelected)}
        />
      </Container>
      <Container maxWidth='xl'>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h5' fontWeight={600} color='primary'>
            Mostrar pedidos pendientes
          </Typography>
          <Expandir
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMore />
          </Expandir>
        </Box>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Cards orders={orders} handler={handleUpdateStateOrder} />
        </Collapse>
      </Container>
    </>
  );
}

export default Orders;
