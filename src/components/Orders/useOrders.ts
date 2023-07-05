import { SelectionChangedEvent } from "ag-grid-community";
import ORDER from "../../types/ORDER";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import * as useCases from "../../services/orders.usecases";

export default function useOrders({
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
      openSnackBar("error", "Hubo un error al agregar el pedido 😞");
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
  };

  return {
    orders,
    selectedOrder,
    handleChangeSelection,
    updateGrid,
    updateDeleteGrid,
  };
}
