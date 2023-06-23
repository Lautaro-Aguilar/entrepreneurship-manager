const buildColumns = () => {
  const columns = [
    { headerName: "Cliente", field: "cliente" },
    { headerName: "Productos", field: "productos" },
    { headerName: "Cantidades", field: "cantidades" },
    { headerName: "Fecha cargado", field: "fecharealizado" },
    { headerName: "Fecha de Entrega", field: "fechaentrega" },
    { headerName: "Seña", field: "sena" },
    { headerName: "Total", field: "total" },
  ]
  return columns
}

export default buildColumns