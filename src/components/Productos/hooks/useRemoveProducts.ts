import { useState } from "react";
import PRODUCT from "../../../types/PRODUCT";
import * as useCases from "../../../services/products.service";

export default function useRemoveProducts() {
  const [rowsSelected, setRowsSelected] = useState<PRODUCT[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteRows = (products: PRODUCT[]) => {
    products.forEach((product: PRODUCT) => {
      useCases.deleteProduct(product.id);
    });
  };

  const openRemoveModal = () => setIsRemoveModalOpen(true);
  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  return {
    rowsSelected,
    handleRowsSelected,
    handleDeleteRows,
    openRemoveModal,
    closeRemoveModal,
    isRemoveModalOpen,
  };
}

/* 

SupAnonymo — hoy a las 18:56
<AgGridReact key={refreshGrid} rowData={clients} columnDefs={columns} rowSelection="multiple" onRowSelected={(e) => setRowsSelected(e.api.getSelectedRows())} />

    { headerName: "Nombre", field: "nombre", checkboxSelection: true, headerCheckboxSelection: true },

*/
