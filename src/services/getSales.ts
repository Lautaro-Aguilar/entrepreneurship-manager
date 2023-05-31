import SALE from "../types/SALE";
import supabase from "../supabase/supabase";
import Error from "../types/ERROR";

export async function getProducts(): Promise<SALE[] | Error> {
  const { data: sales, error } = await supabase.from("ventas").select("*");

  if (sales && !error) {
    const response: SALE[] = sales.map((sale) => {
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
    return response;
  }
  return {
    title: "Error en ventas",
    message: "No se pudo obtener la lista de las ventas",
  };
}
