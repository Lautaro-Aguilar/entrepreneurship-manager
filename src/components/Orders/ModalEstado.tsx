import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import styleModal from "../Clientes/styleModal";
import { useTheme } from "@emotion/react";
import SELECTEDORDER from "../../types/SELECTEDORDER";

interface ModalEstadoProps {
  open: boolean;
  handleClose: () => void;
  pedidos: SELECTEDORDER[];
  handleSubmit: () => void;
}

interface PedidoItemProps {
  id: number;
  estado: string;
  fechaentrega: string | Date | undefined;
  index: number;
}

function ModalEstado({
  open,
  handleClose,
  pedidos,
  handleSubmit,
}: ModalEstadoProps) {
  const theme: any = useTheme();

  const PedidoItem = ({ id, estado, fechaentrega, index }: PedidoItemProps) => {
    const colorEstado = estado === "Pendiente" ? "red" : "green";
    const textoEstado = estado === "Pendiente" ? "Finalizado" : "Pendiente";

    return (
      <ListItem>
        <ListItemText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span>ID Pedido: {id}</span>
            <span>Fecha entrega: {fechaentrega?.toLocaleString()}</span>
            <span>
              Estado actual:{" "}
              <span
                style={{
                  marginLeft: 2.5,
                  color: colorEstado,
                  fontWeight: "600",
                }}
              >
                {estado}
              </span>
            </span>
            <span>
              Nuevo estado:{" "}
              <span
                style={{
                  marginLeft: 2.5,
                  color: colorEstado === "red" ? "green" : "red",
                  fontWeight: "600",
                }}
              >
                {textoEstado}
              </span>
            </span>
          </Box>
          {index !== pedidos.length - 1 && (
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
      </ListItem>
    );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Box
            className='headerModal'
            px={2}
            py={1}
            borderRadius={"10px 10px 0px 0px"}
            bgcolor={theme.palette.secondary.main}
            color='theme.palette.success.contrastText'
          >
            <Typography
              id='modal-modal-title'
              variant='h6'
              fontWeight={600}
              component='h2'
            >
              Cambiar estado
            </Typography>
          </Box>

          <Box
            className='bodyModal'
            px={2}
            py={2}
            sx={{ display: "flex", flexDirection: "column" }}
            borderRadius={"0px 0px 10px 10px"}
          >
            <Typography variant='body1' textAlign='center' component='h3'>
              Vas a cambiar los estados de los siguientes pedidos:
            </Typography>
            <List>
              {pedidos.map((pedido, index) => (
                <PedidoItem
                  key={pedido.idpedido}
                  id={pedido.idpedido}
                  estado={pedido.estado}
                  fechaentrega={pedido.fechaentrega}
                  index={index}
                />
              ))}
            </List>
            <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
              <Button variant='contained' color='error' onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={handleSubmit}
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

export default ModalEstado;
