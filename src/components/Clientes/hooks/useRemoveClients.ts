import { useState } from "react";
import CUSTOMER from "../../../types/CUSTOMER";
import * as useCases from "../../../services/customers.useCases";
import { AlertColor } from "@mui/material";

interface Params {
  updateClients: (client: CUSTOMER[]) => void;
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
}

export default function useRemoveClients({
  updateClients,
  openSnackBar,
}: Params) {
  const [rowsSelected, setRowsSelected] = useState<CUSTOMER[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const openRemoveModal = () => setIsRemoveModalOpen(true);
  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteRows = (clients: CUSTOMER[]) => {
    const promises = clients.map((client) => {
      return new Promise((resolve, reject) => {
        useCases.destroy(client.id).then((response) => {
          resolve(response);
        });
      });
    });

    Promise.all(promises).then((resultados) => {
      useCases.getAll().then(({ data }) => {
        updateClients(data);
        closeRemoveModal();
        openSnackBar("success", "Cliente removido correctamente 👍");
      });
    });
  };

  return {
    rowsSelected,
    handleRowsSelected,
    handleDeleteRows,
    openRemoveModal,
    closeRemoveModal,
    isRemoveModalOpen,
  };
}
