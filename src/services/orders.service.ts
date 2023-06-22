import supabase from "../supabase/supabase";
import ORDER from "../types/ORDER";
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

  let customersResponse: __TORDER[] = [];
  if (orders) {
    customersResponse = orders.map((order) => {
      const newOrder: __TORDER = {
        idpedido: order.idpedido,
        cliente: order.cliente,
        sena: order.sena,
        total: order.total,
        productos: order.productos.join(","),
        cantidades: order.arraydecantidad.join(","),
        fechaentrega: order.fechaentrega,
        fecharealizado: formatDate(new Date(order.fecharealizado)),
      };
      return newOrder;
    });
  }
  return {
    data: customersResponse,
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
  const { data: newOrder, error } = await supabase.from("pedidos").insert(data);

  const response = {
    data: newOrder,
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

export async function deleteOrder(id: number) {
  const { data: supabaseResponse, error } = await supabase
    .from("pedidos")
    .delete()
    .eq("idpedido", id);

  const response = {
    data: supabaseResponse,
    errors: error,
  };

  return response;
}
