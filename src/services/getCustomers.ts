import CUSTOMER from "../types/CUSTOMER";
import supabase from "../supabase/supabase";
import RESPONSE from "../types/RESPONSE";

export async function getClients(): Promise<RESPONSE> {
  const { data: customers, error } = await supabase
    .from("clientes")
    .select("*");

  let customersResponse: CUSTOMER[] = [];
  if (customers) {
    customersResponse = customers.map((customer) => {
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
  }
  return {
    data: customersResponse,
    errors: error,
  };
}
