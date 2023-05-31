import PRODUCT from "../types/PRODUCT";
import supabase from "../supabase/supabase";
import Error from "../types/ERROR";

export async function getProducts(): Promise<PRODUCT[] | Error> {
  const { data: products, error } = await supabase
    .from("productos")
    .select("*");

  if (products && !error) {
    const response: PRODUCT[] = products.map((product) => {
      const newProduct: PRODUCT = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        costo: product.costo,
        inserted_at: product.inserted_at,
      };
      return newProduct;
    });
    return response;
  }
  return {
    title: "Error en productos",
    message: "No se pudo obtener la lista de los productos",
  };
}
