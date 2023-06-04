import PRODUCT from "../../../types/PRODUCT";
import ActionColumn from "./ActionColumn";

const buildColumns = (handleUpdate: (product: PRODUCT) => void) => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "nombre", headerName: "Nombre" },
    { field: "precio", headerName: "Precio" },
    { field: "costo", headerName: "Costo" },
    { field: "inserted_at", headerName: "Creado El" },
    {
      headerName: "Acciones",
      cellRenderer: ActionColumn,
      cellRendererParams: { handleUpdate },
      width: 100,
    },
  ];
  return columns;
};

export default buildColumns;
