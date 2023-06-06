import { useState, useEffect } from 'react'
import CUSTOMER from '../../../types/CUSTOMER'
import * as useCases from "../../../services/customers.useCases"

export default function useModifyClients() {
  const [clients, setClients] = useState<CUSTOMER[]>([])
  const [openModalModificar, setOpenModalModificar] = useState(false)
  const [selectedClient, setSelectedClient] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  })

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

  const openSnackBar = () => setIsSnackBarOpen(true)
  const closeSnackBar = () => setIsSnackBarOpen(false)

  const openModal = () => setOpenModalModificar(true);
  const closeModal = () => setOpenModalModificar(false);

  const handleUpdateClient = (client: CUSTOMER) => {
    setSelectedClient(client);
    openModal()
  }

  const handleSubmitUpdate = (client: CUSTOMER) => {
    console.log(client)
    useCases.update(client, client.id).then(() => {
      openSnackBar();
      const newClients = clients.map((c) => {
        if (c.id === client.id) {
          return client
        }
        return c
      })
      setClients(newClients)
      closeModal()
    })

  }

  const updateClients = (clients: CUSTOMER[]) => {
    setClients(clients);
  };

  useEffect(() => {
    useCases.getAll().then((response) => {
      setClients(response.data)
    })
  }, [])

  return {
    clients,
    openModalModificar,
    openModal,
    closeModal,
    selectedClient,
    handleUpdateClient,
    handleSubmitUpdate,
    isSnackBarOpen,
    closeSnackBar,
    updateClients
  };
}