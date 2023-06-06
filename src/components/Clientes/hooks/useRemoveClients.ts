import { useState, useEffect } from 'react'
import CUSTOMER from '../../../types/CUSTOMER'
import * as useCases from "../../../services/customers.useCases"

interface Params {
  updateClients: (client: CUSTOMER[]) => void
}

export default function useRemoveClients({ updateClients }: Params) {
  const [rowsSelected, setRowsSelected] = useState<CUSTOMER[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [isRemoveSnackBarOpen, setIsRemoveSnackBarOpen] = useState(false)

  const openRemoveSnackBar = () => setIsRemoveSnackBarOpen(true)
  const closeRemoveSnackBar = () => setIsRemoveSnackBarOpen(false)

  const openRemoveModal = () => setIsRemoveModalOpen(true);
  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  const handleRowsSelected = (e: any) => {
    setRowsSelected(e.api.getSelectedRows());
  };

  const handleDeleteRows = (clients: CUSTOMER[]) => {
    console.log(clients)
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
        openRemoveSnackBar()
        closeRemoveModal();
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
    isRemoveSnackBarOpen,
    closeRemoveSnackBar
  }
}