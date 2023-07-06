import { SelectionChangedEvent } from "ag-grid-community";
import ORDER from "../../types/ORDER";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import * as useCases from "../../services/orders.usecases";
import SELECTEDORDER from "../../types/SELECTEDORDER";
import formatDate from "../../utils/formatDate";

export default function useOrders({
  openSnackBar,
  closeModal,
  closeModalEstado,
}: {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
  closeModal: () => void;
  closeModalEstado: () => void;
}) {
  const [orders, setOrders] = useState<ORDER[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ORDER[]>([]);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  useEffect(() => {
    useCases.getAll().then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  const handleChangeSelection = (e: SelectionChangedEvent<ORDER>) => {
    setSelectedOrder(e.api.getSelectedRows());
  };

  const updateGrid = (response: any) => {
    if (response.errors !== null) {
      openSnackBar("error", "Hubo un error al agregar el pedido 😞");
      closeModal();
    } else {
      setOrders(response.data);
      openSnackBar("success", "Pedido agregado correctamente 👍");
      closeModal();
    }
  };

  const updateDeleteGrid = (response: any) => {
    if (response.errors !== null) {
      openSnackBar("error", "Hubo un error al eliminar el pedido 😞");
      setOpenModalEliminar(false);
    } else {
      setOrders(response.data);
      openSnackBar("success", "Pedido eliminado correctamente 👍");
      setOpenModalEliminar(false);
    }
  };

  const handleUpdateStateOrder = (orders: SELECTEDORDER[]) => {
    useCases.updateState(orders).then((response) => {
      const newOrders = response.data;
      if (newOrders) {
        const formatedOrders = newOrders.map((order) => ({
          ...order,
          cantidades:
            order.arraydecantidad.length > 1
              ? order.arraydecantidad.join(", ")
              : order.arraydecantidad[0].toString(),
          fechaentrega: formatDate(new Date(order.fechaentrega)),
          fecharealizado: formatDate(new Date(order.fecharealizado)),
        }));
        setOrders(formatedOrders);
        openSnackBar("success", "Estado actualizado correctamente 👍");
        closeModalEstado();
      }
    });
  };

  return {
    orders,
    selectedOrder,
    handleChangeSelection,
    updateGrid,
    updateDeleteGrid,
    handleUpdateStateOrder,
    openModalEliminar,
    setOpenModalEliminar,
  };
}
