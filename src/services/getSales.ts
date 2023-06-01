import SALE from "../types/SALE";
import supabase from "../supabase/supabase";
import RESPONSE from "../types/RESPONSE";

export async function getSales(): Promise<RESPONSE> {
  const { data: sales, error } = await supabase.from("ventas").select("*");

  let salesResponse: SALE[] = [];
  if (sales) {
    salesResponse = sales.map((sale) => {
      const newProduct: SALE = {
        id: sale.id,
        id_cliente: sale.id_cliente,
        id_producto: sale.id_producto,
        total: sale.total,
        cantidad: sale.cantidad,
        inserted_at: sale.inserted_at,
      };
      return newProduct;
    });
  }
  return {
    data: salesResponse,
    errors: error,
  };
}
