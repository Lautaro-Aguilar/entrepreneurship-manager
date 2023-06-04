import CUSTOMER from '../../../types/CUSTOMER';
import ActionColumn from './ActionColumn';
type ModificarFunction = (profile: CUSTOMER) => void;


const buildColumns = (modificar: ModificarFunction) => {
  const columns = [
    { headerName: "Nombre", field: "nombre" },
    { headerName: "Apellido", field: "apellido" },
    { headerName: "Dirección", field: "direccion" },
    { headerName: "Telefono", field: "telefono" },
    { headerName: "Fecha creado", field: "inserted_at" },
    { headerName: "Acciones", cellRenderer: ActionColumn, cellRendererParams: { modificar }, width: 100 },
  ];
  return columns
}

export default buildColumns