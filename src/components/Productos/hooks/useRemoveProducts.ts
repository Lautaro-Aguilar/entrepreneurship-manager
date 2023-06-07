import { useState } from "react";
import PRODUCT from "../../../types/PRODUCT";
import * as useCases from "../../../services/products.service";
import { AlertColor } from "@mui/material";

interface Parameters {
  updateProducts: (products: PRODUCT[]) => void;
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
}

export default function useRemoveProducts({
  updateProducts,
  openSnackBar,
}: Parameters) {
  const [rowsSelected, setRowsSelected] = useState<PRODUCT[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteRows = (products: PRODUCT[]) => {
    const promises = products.map((product) => {
      return new Promise((resolve, reject) => {
        useCases.deleteProduct(product.id).then((response) => {
          resolve(response);
        });
      });
    });

    Promise.all(promises).then((resultados) => {
      useCases.getProducts().then(({ data }) => {
        updateProducts(data);
        closeRemoveModal();
        openSnackBar("success", "Producto eliminado correctamente 👍");
      });
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
