import descripcionesDeMeses from "./descripcionesMeses";

export default function formatDate(date: Date, includeTime = false) {
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const year = date.getUTCFullYear();

  const descripcionDelMes = descripcionesDeMeses[mes];

  let descripcion =
    dia.toString() + " " + descripcionDelMes + " " + year.toString();

  if (year !== new Date().getUTCFullYear()) {
    descripcion = descripcion + " " + date.getUTCFullYear().toString();
  }

  if (includeTime) {
    const opciones: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const formatoHora = new Intl.DateTimeFormat("es-ES", opciones);
    const horaFormateada = formatoHora.format(date);

    descripcion += " " + horaFormateada;
  }

  return descripcion;
}
