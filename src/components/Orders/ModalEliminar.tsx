import React from "react";
import {
  Box,
  Typography,
  Modal,
  List,
  Button,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import styleModal from "./styleModal";
import { useTheme } from "@emotion/react";
import SELECTEDORDER from "../../types/SELECTEDORDER";

type ModalEliminarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orders: SELECTEDORDER[];
  handleRemoveSubmit: (order: SELECTEDORDER[]) => void;
};

function ModalEliminar({
  open,
  setOpen,
  orders,
  handleRemoveSubmit,
}: ModalEliminarProps) {
  const theme = useTheme();

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={closeModal}>
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
              {orders.length > 1 ? "Eliminar pedidos " : "Eliminar pedido"}
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
              {orders.length > 1
                ? "Vas a eliminar los siguientes pedidos: "
                : "Vas a eliminar el siguiente pedido:"}
            </Typography>
            <List
              sx={{
                maxHeight: "200px",
                overflow: "hidden",
                overflowY: "auto",
                marginBottom: 2,
              }}
            >
              {orders?.map(({ idpedido, fechaentrega, cliente }, index) => (
                <div key={index}>
                  <ListItem>
                    <Typography variant='body2' component='div'>
                      <ListItemText>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span>ID: {idpedido}</span>
                          <span>FECHA: {fechaentrega.toLocaleString()}</span>
                          <span>CLIENTE: {cliente}</span>
                        </Box>
                        {index !== orders.length - 1 && (
                          <Divider
                            sx={{
                              width: 340,
                              border: "1.5px solid grey",
                              borderRadius: 10,
                              mt: 1,
                              mb: -1,
                            }}
                            light
                          />
                        )}
                      </ListItemText>
                    </Typography>
                  </ListItem>
                </div>
              ))}
            </List>
            <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
              <Button variant='contained' color='error' onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={() => handleRemoveSubmit(orders)}
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
