import PRODUCT from "../../../types/PRODUCT";
import ActionColumn from "./ActionColumn";

const buildColumns = (handleUpdate: (product: PRODUCT) => void) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 70,
    },
    { field: "nombre", headerName: "Nombre" },
    {
      field: "precio",
      headerName: "Precio",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 100,
    },
    {
      field: "costo",
      headerName: "Costo",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 100,
    },
    {
      field: "inserted_at",
      headerName: "Creado El",
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Acciones",
      cellRenderer: ActionColumn,
      cellRendererParams: { handleUpdate },
      headerClass: "header-text-center",
      cellStyle: { textAlign: "center" },
      width: 150,
    },
  ];
  return columns;
};

export default buildColumns;
