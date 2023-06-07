import { useState, useEffect } from "react";
import CUSTOMER from "../../../types/CUSTOMER";
import * as useCases from "../../../services/customers.useCases";
import { AlertColor } from "@mui/material";

interface Params {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
}

export default function useModifyClients({ openSnackBar }: Params) {
  const [clients, setClients] = useState<CUSTOMER[]>([]);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [selectedClient, setSelectedClient] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  });

  const openModal = () => setOpenModalModificar(true);
  const closeModal = () => setOpenModalModificar(false);

  const handleUpdateClient = (client: CUSTOMER) => {
    setSelectedClient(client);
    openModal();
  };

  const handleSubmitUpdate = (client: CUSTOMER) => {
    useCases.update(client, client.id).then(() => {
      const newClients = clients.map((c) => {
        if (c.id === client.id) {
          return client;
        }
        return c;
      });
      setClients(newClients);
      openSnackBar("success", "Cliente modificado correctamente 👍");
      closeModal();
    });
  };

  const updateClients = (clients: CUSTOMER[]) => {
    setClients(clients);
  };

  useEffect(() => {
    useCases.getAll().then((response) => {
      setClients(response.data);
    });
  }, []);

  return {
    clients,
    openModalModificar,
    openModal,
    closeModal,
    selectedClient,
    handleUpdateClient,
    handleSubmitUpdate,
    updateClients,
  };
}
