import supabase from "../supabase/supabase";
import ORDER from "../types/ORDER";

export async function getDashboardInfo({
  initialDate,
  lastDate,
  mode,
}: {
  initialDate: string;
  lastDate: string;
  mode: string;
}) {
  const errors = [];

  // Devuelve la suma de las ventas entre 2 fechas
  const { data: sells, error: sellsError } = await supabase.rpc(
    "obtener_suma_rango",
    {
      fecha_inicio: initialDate,
      fecha_fin: lastDate,
    }
  );

  if (sellsError) errors.push({ sellsError });

  const { data: cost, error: costError } = await supabase.rpc(
    "calcular_costo_rango",
    {
      fecha_inicio: initialDate,
      fecha_fin: lastDate,
    }
  );

  if (costError) errors.push({ costError });
  const profit = sells - cost;

  const { data: clientsCount, error: clientsCountError } = await supabase.rpc(
    "count_clientes",
    {
      fecha_inicio: initialDate,
      fecha_fin: lastDate,
    }
  );

  if (clientsCountError) errors.push({ clientsCountError });

  const { data: lastSells, error: lastSellsError } = await supabase
    .from("vista_pedidos")
    .select("*")
    .order("fecharealizado", { ascending: false })
    .limit(3);

  const lastSellsResponse: ORDER[] | undefined = lastSells?.map((sell: any) => {
    const newSell: ORDER = {
      ...sell,
    };
    return newSell;
  });

  if (lastSellsError) errors.push({ lastSellsError });

  const { data: chartBar, error: chartBarError } = await supabase.rpc(
    "calcular_total_por_mes"
  );

  if (chartBarError) errors.push({ chartBarError });

  const totalArray: number[] = chartBar.map(
    ({ total }: { total: number }) => total
  );

  const monthLabels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const chartArrayResponse = {
    labels: monthLabels,
    datasets: [
      {
        label: "Ventas",
        data: totalArray,
        backgroundColor: mode === "light" ? "#198a2c" : "#e85d04",
      },
    ],
  };

  const response = {
    data: {
      sells,
      profit,
      clientsCount,
      lastSellsResponse,
      chartArrayResponse,
    },
    errors,
  };

  return response;
}
