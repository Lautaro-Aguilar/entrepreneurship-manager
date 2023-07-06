import { SelectionChangedEvent } from "ag-grid-community";
import ORDER from "../../types/ORDER";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import * as useCases from "../../services/orders.usecases";
import SELECTEDORDER from "../../types/SELECTEDORDER";

export default function useOrders({
  openSnackBar,
  closeModal,
}: {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
  closeModal: () => void;
}) {
  const [orders, setOrders] = useState<ORDER[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ORDER[]>([]);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

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
    console.log("original orders:", orders);
    useCases.updateState(orders).then((response) => {
      const updatedOrders = response.data;
      const newOrders = orders.map((originalOrder) => {
        const updatedOrder = updatedOrders?.find(
          (updOrder) => updOrder.idpedido === originalOrder.idpedido
        );
        return updatedOrder || originalOrder;
      });
      console.log("new orders", newOrders);
      /* setOrders(newOrders); */
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
