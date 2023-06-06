import {
  Box,
  Typography,
  Modal,
  ListItem,
  List,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import styleModal from "./styleModal";
import PRODUCT from "../../types/PRODUCT";

type ModalEliminarProps = {
  products: PRODUCT[];
  closeModal: () => void;
  isOpen: boolean;
  handleRemoveSubmit: (product: PRODUCT[]) => void;
};

function ModalEliminar({
  isOpen,
  products,
  closeModal,
  handleRemoveSubmit,
}: ModalEliminarProps) {
  const theme = useTheme();

  return (
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
          <input
            type='button'
            value='test'
            onClick={() => console.log(products)}
          />
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
            {products.length > 1
              ? "Vas a los siguientes usuarios: "
              : "Vas a eliminar el siguiente usuario:"}
          </Typography>
          <List>
            {products.map(({ nombre, id }) => (
              <ListItem key={id}>
                <ListItemText>{nombre}</ListItemText>
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
              onClick={() => handleRemoveSubmit(products)}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalEliminar;
