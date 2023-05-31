import CUSTOMER_SALES from "../types/CUSTOMER_SALES";
import supabase from "../supabase/supabase";
import Error from "../types/ERROR";

export async function getCustomerSales(): Promise<CUSTOMER_SALES[] | Error> {
  const { data: customerSales, error } = await supabase
    .from("clientes_ventas")
    .select("*");

  if (customerSales && !error) {
    const response: CUSTOMER_SALES[] = customerSales.map((csale) => {
      const newCSale: CUSTOMER_SALES = {
        apellido: csale.apellido,
        cantidad: csale.cantidad,
        costo: csale.costo,
        nombre: csale.nombre,
        precio: csale.precio,
        producto_nombre: csale.producto_nombre,
        total: csale.total,
        inserted_at: csale.inserted_at,
      };
      return newCSale;
    });
    return response;
  }
  return {
    title: "Error en ventas",
    message: "No se pudo obtener la lista de las ventas",
  };
}
