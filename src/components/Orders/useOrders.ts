import { SelectionChangedEvent } from "ag-grid-community";
import ORDER from "../../types/ORDER";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import * as useCases from "../../services/orders.usecases";
import SELECTEDORDER from "../../types/SELECTEDORDER";
import OrderResponse from "../../types/OrderResponse";
import formatDate from "../../utils/formatDate";
import REQUESTORDER from "../../types/REQUESTORDER";
import * as orderUseCases from "../../services/orders.usecases";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import CUSTOMER from "../../types/CUSTOMER";

interface HandleSubmitModificar {
  (
    products: PRODUCTLIST[],
    clientToModify: CUSTOMER,
    orderToModify: any,
    cantidades: (number | undefined)[],
    total: number
  ): void;
}

export default function useOrders({
  openSnackBar,
  closeModal,
  closeModalEstado,
  closeModalModificar,
}: {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
  closeModal: () => void;
  closeModalEstado: () => void;
  closeModalModificar: () => void;
}) {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ORDER[]>([]);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  useEffect(() => {
    useCases.getAll().then((res) => setOrders(res.data));
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
      const newOrders = response.data;
      if (newOrders) {
        const formatedOrders: any = newOrders.map((order: any) => ({
          ...order,
          cantidades:
            order.arraydecantidad.length > 1
              ? order.arraydecantidad.join(", ")
              : order.arraydecantidad[0].toString(),
          fechaentrega: formatDate(new Date(order.fechaentrega)),
          fecharealizado: formatDate(new Date(order.fecharealizado)),
        }));
        setOrders(formatedOrders);
        openSnackBar("success", "Pedido eliminado correctamente 👍");
        setOpenModalEliminar(false);
      }
    }
  };

  const handleUpdateStateOrder = (orders: SELECTEDORDER[]) => {
    useCases.updateState(orders).then((response) => {
      const newOrders = response.data;
      if (newOrders) {
        const formatedOrders: any = newOrders.map((order) => ({
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

  const handleSubmitModificar: HandleSubmitModificar = (
    products,
    clientToModify,
    orderToModify,
    cantidades,
    total
  ) => {
    const arrayidsproductos = products.map((prod) => prod.id);
    const request: REQUESTORDER = {
      idcliente: clientToModify.id,
      arrayidsproductos,
      arraydecantidad: cantidades,
      fechaentrega: orderToModify.fechaentrega,
      total,
      estado: "Pendiente",
    };
    orderUseCases.update(request, orderToModify.idpedido).then((response) => {
      const newOrders = response.data;
      if (newOrders) {
        const formatedOrders: any = newOrders.map((order) => ({
          ...order,
          cantidades:
            order.arraydecantidad.length > 1
              ? order.arraydecantidad.join(", ")
              : order.arraydecantidad[0].toString(),
          fechaentrega: formatDate(new Date(order.fechaentrega)),
          fecharealizado: formatDate(new Date(order.fecharealizado)),
        }));
        setOrders(formatedOrders);
        openSnackBar("success", "Estado modificado correctamente 👍");
        closeModalModificar();
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
    handleSubmitModificar,
    setOpenModalEliminar,
  };
}
