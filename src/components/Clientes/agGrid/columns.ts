import CUSTOMER from '../../../types/CUSTOMER';
import ActionColumn from './ActionColumn';


const buildColumns = (handleUpdate: (client: CUSTOMER) => void) => {
  const columns = [
    { headerName: "Nombre", field: "nombre", checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: "Apellido", field: "apellido" },
    { headerName: "Dirección", field: "direccion" },
    { headerName: "Telefono", field: "telefono" },
    { headerName: "Fecha creado", field: "inserted_at" },
    { headerName: "Acciones", cellRenderer: ActionColumn, cellRendererParams: { handleUpdate }, width: 100 },
  ];
  return columns
}

export default buildColumns