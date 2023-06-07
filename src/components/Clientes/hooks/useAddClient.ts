import { useState, useEffect } from "react";
import CUSTOMER from "../../../types/CUSTOMER";
import * as useCases from "../../../services/customers.useCases";
import { AlertColor } from "@mui/material";

interface Params {
  clients: CUSTOMER[];
  updateClients: (client: CUSTOMER[]) => void;
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
}

export default function useAddClient({
  clients,
  updateClients,
  openSnackBar,
}: Params) {
  const [isOpenModalAgregar, setIsOpenModalAgregar] = useState(false);
  const [client, setClient] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  });
  const [formErrorAdd, setFormErrorAdd] = useState(false);

  const [isSnackBarOpenAdd, setIsSnackBarOpenAdd] = useState(false);

  const openSnackBarAdd = () => setIsSnackBarOpenAdd(true);
  const closeSnackBarAdd = () => setIsSnackBarOpenAdd(false);

  const openModalAgregar = () => setIsOpenModalAgregar(true);
  const closeModalAgregar = () => {
    setIsOpenModalAgregar(false);
    setFormErrorAdd(false);
  };

  const handleSubmitAdd = (client: CUSTOMER) => {
    if (client.nombre !== "" || client.apellido !== "") {
      useCases.create(client).then((response) => {
        openSnackBarAdd();
        setClient({
          nombre: "",
          apellido: "",
          direccion: "",
          telefono: "",
        });
        updateClients([...clients, client]);
        closeModalAgregar();
        openSnackBar("success", "Cliente agregado correctamente 👍");
      });
    } else {
      setFormErrorAdd(true);
    }
  };

  useEffect(() => {
    useCases.getAll().then((response) => {
      updateClients(response.data);
    });
  }, []);

  return {
    isOpenModalAgregar,
    openModalAgregar,
    closeModalAgregar,
    handleSubmitAdd,
    isSnackBarOpenAdd,
    closeSnackBarAdd,
    formErrorAdd,
    setFormErrorAdd,
  };
}
