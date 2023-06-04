import CUSTOMER from '../../../types/CUSTOMER';
import ActionColumn from './ActionColumn';
type ModificarFunction = (profile: CUSTOMER) => void;


const buildColumns = (handleModificar: ModificarFunction) => {
  const columns = [
    { headerName: "Nombre", field: "nombre", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Apellido", field: "apellido" },
    { headerName: "Dirección", field: "direccion" },
    { headerName: "Telefono", field: "telefono" },
    { headerName: "Fecha creado", field: "inserted_at" },
    { headerName: "Acciones", cellRenderer: ActionColumn, cellRendererParams: { handleModificar }, width: 100 },
  ];
  return columns
}

export default buildColumns