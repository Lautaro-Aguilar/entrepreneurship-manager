import CUSTOMER from "../types/CUSTOMER";
import supabase from "../supabase/supabase";
import Error from "../types/ERROR";

export async function getClients(): Promise<CUSTOMER[] | Error> {
  const { data: customers, error } = await supabase
    .from("clientes")
    .select("*");

  if (customers && !error) {
    const response: CUSTOMER[] = customers.map((customer) => {
      const newCustomer: CUSTOMER = {
        id: customer.id,
        nombre: customer.nombre,
        apellido: customer.apellido,
        direccion: customer.direccion,
        telefono: customer.telefono,
        inserted_at: customer.inserted_at,
      };

      return newCustomer;
    });
    return response;
  }
  return {
    title: "Error en clientes",
    message: "No se pudo obtener la lista de los clientes",
  };
}
