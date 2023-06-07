import {
  Box,
  Typography,
  Modal,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import styleModal from "./styleModal";
import { useTheme } from "@emotion/react";
import CUSTOMER from "../../types/CUSTOMER";
type ModalEliminarProps = {
  isOpen: boolean;
  closeModal: () => void;
  clients: CUSTOMER[];
  handleRemoveSubmit: (client: CUSTOMER[]) => void;
};

function ModalEliminar({
  isOpen,
  closeModal,
  clients,
  handleRemoveSubmit,
}: ModalEliminarProps) {
  const theme = useTheme();

  return (
    <div>
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={styleModal}>
          <Box
            className='headerModal'
            px={2}
            py={1}
            borderRadius={"10px 10px 0px 0px"}
            bgcolor={theme.palette.error.dark}
            color='theme.palette.success.contrastText'
          >
            <Typography
              id='modal-modal-title'
              variant='h6'
              fontWeight={600}
              component='h2'
            >
              Eliminar cliente
            </Typography>
          </Box>
          <Box
            className='bodyModal'
            px={2}
            py={2}
            sx={{ display: "flex", flexDirection: "column" }}
            borderRadius={"0px 0px 10px 10px"}
          >
            <Typography variant='h6' textAlign='start' component='h3'>
              {clients.length > 1
                ? "Vas a los siguientes usuarios: "
                : "Vas a eliminar el siguiente usuario:"}
            </Typography>
            <List>
              {clients?.map(({ nombre, apellido }, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    {nombre} {apellido}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
              <Button variant='contained' color='error' onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={() => handleRemoveSubmit(clients)}
              >
                Aceptar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalEliminar;
