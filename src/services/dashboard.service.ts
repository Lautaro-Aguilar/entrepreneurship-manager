import supabase from "../supabase/supabase";

export async function getDashboardInfo({
  initialDate,
  lastDate,
}: {
  initialDate: Date;
  lastDate: Date;
}) {
  const { data, error } = await supabase.rpc("obtener_suma_rango", {
    fecha_inicio: initialDate,
    fecha_fin: lastDate,
  });

  return { data, error };
}
