import { Box, Typography, Modal, ListItem, List } from "@mui/material";
import styleModal from "./styleModal";
import PRODUCT from "../../types/PRODUCT";

type ModalEliminarProps = {
  products: PRODUCT[];
  closeModal: () => void;
  isOpen: boolean;
  handleRemoveSubmit: (product: PRODUCT[]) => void;
};

function ModalEliminar({ isOpen, products, closeModal }: ModalEliminarProps) {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styleModal}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Modal Eliminar
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <List>
            {products.map((product) => (
              <ListItem>{product.nombre}</ListItem>
            ))}
          </List>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalEliminar;
