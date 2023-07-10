import { format } from "date-fns";

export default function obtenerFechas(): [string, string] {
  const hoy = new Date();
  const fechaHoyFormateada = format(hoy, "yyyy-MM-dd");
  const fechaHaceUnMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth() - 1,
    hoy.getDate(),
    hoy.getHours(),
    hoy.getMinutes(),
    hoy.getSeconds()
  );
  const fechaHaceUnMesFormateada = format(fechaHaceUnMes, "yyyy-MM-dd");

  return [fechaHoyFormateada, fechaHaceUnMesFormateada];
}
