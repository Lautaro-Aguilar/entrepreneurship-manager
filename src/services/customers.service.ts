import CUSTOMER from "../types/CUSTOMER";
import supabase from "../supabase/supabase";
import RESPONSE from "../types/RESPONSE";

export async function getCustomers(): Promise<RESPONSE> {
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

export async function getCustomer(id: number): Promise<RESPONSE> {
  const { data: customer, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id);

  if (customer) {
    const customerResponse: CUSTOMER = {
      id: customer[0].id,
      nombre: customer[0].nombre,
      apellido: customer[0].apellido,
      direccion: customer[0].direccion,
      telefono: customer[0].telefono,
      inserted_at: customer[0].inserted_at,
    };
    const response = {
      data: customerResponse,
      errors: error,
    };
    return response;
  }
  const response = {
    data: customer,
    errors: error,
  };

  return response;
}

export async function createCustomer(data: CUSTOMER): Promise<RESPONSE> {
  const { data: supabaseResponse, error } = await supabase
    .from("clientes")
    .insert(data);

  const response = {
    data: supabaseResponse,
    errors: error,
  };

  return response;
}

export async function updateCustomer(
  data: CUSTOMER,
  id: number
): Promise<RESPONSE> {
  const { data: supabaseResponse, error } = await supabase
    .from("clientes")
    .update(data)
    .eq("id", id);

  const response = {
    data: supabaseResponse,
    errors: error,
  };

  return response;
}

export async function deleteCustomer(id: number): Promise<RESPONSE> {
  const { data, error } = await supabase.from("clientes").delete().eq("id", id);

  const response = {
    data: data,
    errors: error,
  };

  return response;
}
