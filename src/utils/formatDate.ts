import descripcionesDeMeses from './descripcionesMeses'

export default function formatDate(date: Date) {
  const dia = date.getDate()
  const mes = date.getMonth() + 1
  const year = date.getUTCFullYear()

  const descripcionDelMes = descripcionesDeMeses[mes]

  let descripcion = dia.toString() + ' ' + descripcionDelMes + ' ' + year.toString()

  if (year !== new Date().getUTCFullYear()) {
    descripcion = descripcion + ' ' + date.getUTCFullYear().toString()
  }

  return descripcion
}