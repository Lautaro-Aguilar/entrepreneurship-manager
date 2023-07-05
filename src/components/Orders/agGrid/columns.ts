const buildColumns = () => {
  const columns = [
    {
      headerName: "ID",
      field: "idpedido",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 100,
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
    },
    { headerName: "Cliente", field: "cliente" },
    { headerName: "Productos", field: "productos" },
    {
      headerName: "Cantidades",
      field: "cantidades",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 150,
    },
    {
      headerName: "Fecha cargado",
      field: "fecharealizado",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Fecha de Entrega",
      field: "fechaentrega",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Total",
      field: "total",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 100,
    },
    {
      headerName: "Estado",
      field: "estado",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 150,
    },
  ];
  return columns;
};

export default buildColumns;
