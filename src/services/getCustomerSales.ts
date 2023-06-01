import CUSTOMER_SALES from "../types/CUSTOMER_SALES";
import supabase from "../supabase/supabase";
import RESPONSE from "../types/RESPONSE";

export async function getCustomerSales(): Promise<RESPONSE> {
  const { data: customerSales, error } = await supabase
    .from("clientes_ventas")
    .select("*");

  let customerSalesResponse: CUSTOMER_SALES[] = [];
  if (customerSales) {
    customerSalesResponse = customerSales.map((csale) => {
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
  }
  return {
    data: customerSalesResponse,
    errors: error,
  };
}
