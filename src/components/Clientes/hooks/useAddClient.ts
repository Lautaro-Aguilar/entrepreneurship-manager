import { useState, useEffect } from 'react'
import CUSTOMER from '../../../types/CUSTOMER'
import * as useCases from "../../../services/customers.useCases"

interface Params {
  clients: CUSTOMER[];
  updateClients: (client: CUSTOMER[]) => void
}

export default function useAddClient({ clients, updateClients }: Params) {
  const [isOpenModalAgregar, setIsOpenModalAgregar] = useState(false)
  const [client, setClient] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  })
  const [formErrorAdd, setFormErrorAdd] = useState(false)

  const [isSnackBarOpenAdd, setIsSnackBarOpenAdd] = useState(false)

  const openSnackBarAdd = () => setIsSnackBarOpenAdd(true)
  const closeSnackBarAdd = () => setIsSnackBarOpenAdd(false)

  const openModalAgregar = () => setIsOpenModalAgregar(true);
  const closeModalAgregar = () => { setIsOpenModalAgregar(false); setFormErrorAdd(false) };

  const handleSubmitAdd = (client: CUSTOMER) => {

    if (client.nombre !== "" || client.apellido !== "") {
      useCases.create(client).then((response) => {
        console.log(response)
        openSnackBarAdd();
        setClient({
          nombre: "",
          apellido: "",
          direccion: "",
          telefono: "",
        })
        updateClients([...clients, client])
        closeModalAgregar()
      })
    } else {
      setFormErrorAdd(true)
    }
  }

  useEffect(() => {
    useCases.getAll().then((response) => {
      updateClients(response.data)
    })
  }, [])

  return {
    isOpenModalAgregar,
    openModalAgregar,
    closeModalAgregar,
    handleSubmitAdd,
    isSnackBarOpenAdd,
    closeSnackBarAdd,
    formErrorAdd,
    setFormErrorAdd
  };
}