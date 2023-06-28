const buildColumns = () => {
  const columns = [
    {
      headerName: "ID",
      field: "idpedido",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Cliente", field: "cliente" },
    { headerName: "Productos", field: "productos" },
    { headerName: "Cantidades", field: "cantidades" },
    { headerName: "Fecha cargado", field: "fecharealizado" },
    { headerName: "Fecha de Entrega", field: "fechaentrega" },
    { headerName: "Seña", field: "sena" },
    { headerName: "Total", field: "total" },
    { headerName: "Estado", field: "estado" },
  ];
  return columns;
};

export default buildColumns;
