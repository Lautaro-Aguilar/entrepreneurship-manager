import PRODUCT from "../types/PRODUCT";
import supabase from "../supabase/supabase";
import RESPONSE from "../types/RESPONSE";

export async function getProducts(): Promise<RESPONSE> {
  const { data: products, error } = await supabase
    .from("productos")
    .select("*");

  let productsResponse: PRODUCT[] = [];
  if (products) {
    productsResponse = products.map((product) => {
      const newProduct: PRODUCT = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        costo: product.costo,
        inserted_at: product.inserted_at,
      };
      return newProduct;
    });
  }
  const response = {
    data: productsResponse,
    errors: error,
  };

  return response;
}
