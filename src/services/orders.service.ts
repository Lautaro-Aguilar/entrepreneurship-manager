import supabase from "../supabase/supabase";
import ORDER from "../types/ORDER";
import SELECTEDORDER from "../types/SELECTEDORDER";
import formatDate from "../utils/formatDate";

interface __TORDER extends ORDER {
  cliente: string;
  productos: string;
  cantidades: string;
  fecharealizado: string;
}

export async function getOrders() {
  const { data: orders, error } = await supabase
    .from("vista_pedidos")
    .select("*");

  let orderResponse: __TORDER[] = [];
  if (orders) {
    orderResponse = orders.map((order) => {
      const newOrder: __TORDER = {
        idpedido: order.idpedido,
        cliente: order.cliente,
        sena: order.sena,
        total: order.total,
        productos: order.productos.join(","),
        cantidades: order.arraydecantidad.join(","),
        fechaentrega: formatDate(new Date(order.fechaentrega), true),
        fecharealizado: formatDate(new Date(order.fecharealizado), true),
        estado: order.estado,
      };
      return newOrder;
    });
  }

  return {
    data: orderResponse,
    errors: error,
  };
}

export async function getOrder(idPedido: number) {
  const { data: order, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("idpedido", idPedido);

  if (order) {
    const orderResponse: ORDER = {
      idpedido: order[0].idpedido,
      idcliente: order[0].idcliente,
      arrayidsproductos: order[0].arrayidsproductos,
      arraydecantidad: order[0].arraydecantidad,
      fechaentrega: order[0].fechaentrega,
      sena: order[0].sena,
      total: order[0].total,
      estado: order[0].estado,
    };
    const response = {
      data: orderResponse,
      errors: error,
    };
    return response;
  }
  const response = {
    data: order,
    errors: error,
  };

  return response;
}

export async function createOrder(data: ORDER) {
  const { error } = await supabase.from("pedidos").insert(data);

  const newValues = await getOrders();

  const response = {
    data: newValues.data,
    errors: error,
  };

  return response;
}

export async function updateOrder(data: ORDER, id: number) {
  const { data: newOrder, error } = await supabase
    .from("pedidos")
    .update(data)
    .eq("idpedido", id);

  const response = {
    data: newOrder,
    errors: error,
  };

  return response;
}

export async function deleteOrders(orderIDs: number[]) {
  const { data: deletedData, error } = await supabase
    .from("pedidos")
    .delete()
    .in("idpedido", orderIDs);

  if (error) {
    return { data: null, errors: error };
  }

  const { data: remainingData, error: remainingError } = await supabase
    .from("vista_pedidos")
    .select("*");

  const response = {
    deletedData,
    data: remainingData,
    errors: remainingError,
  };

  return response;
}


export async function updateStateOrder(orders: SELECTEDORDER[]) {
  const updatedOrders = orders.map((order) => {
    return {
      idpedido: order.idpedido,
      estado: order.estado === "Finalizado" ? "Pendiente" : "Finalizado",
    };
  });

  const { data, error } = await supabase
    .from("pedidos")
    .upsert(updatedOrders)
    .select("*");

  const response = {
    data,
    errors: error,
  };

  return response;
}
