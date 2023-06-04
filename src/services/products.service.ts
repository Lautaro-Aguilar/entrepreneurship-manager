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

export async function getProduct(id: number): Promise<RESPONSE> {
  const { data: product, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id);

  if (product) {
    const productResponse: PRODUCT = {
      id: product[0].id,
      nombre: product[0].nombre,
      precio: product[0].precio,
      costo: product[0].costo,
      inserted_at: product[0].inserted_at,
    };
    const response = {
      data: productResponse,
      errors: error,
    };
    return response;
  }
  const response = {
    data: product,
    errors: error,
  };

  return response;
}

export async function createProduct(data: PRODUCT): Promise<RESPONSE> {
  const { data: supabaseResponse, error } = await supabase
    .from("productos")
    .insert(data);

  const response = {
    data: supabaseResponse,
    errors: error,
  };

  return response;
}

export async function updateProduct(
  data: PRODUCT,
  id?: number
): Promise<RESPONSE> {
  const { data: supabaseResponse, error } = await supabase
    .from("productos")
    .update(data)
    .eq("id", id);

  const response = {
    data: supabaseResponse,
    errors: error,
  };

  return response;
}

export async function deleteProduct(id: number): Promise<RESPONSE> {
  const { data, error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  const response = {
    data: data,
    errors: error,
  };

  return response;
}
