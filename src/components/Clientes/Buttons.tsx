import { Box, Button } from "@mui/material"


type ButtonsProps = {
  setOpenModalAgregar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalEliminar: React.Dispatch<React.SetStateAction<boolean>>;
};

function Buttons({ setOpenModalAgregar, setOpenModalEliminar }: ButtonsProps) {
  return (
    <Box sx={{ display: "flex", my: 2, justifyContent: "space-around" }}>
      <Button
        variant='contained'
        color='info'
        size='large'
        onClick={() => setOpenModalAgregar(true)}
      >
        Agregar
      </Button>
      <Button
        variant='contained'
        color='error'
        size='large'
        onClick={() => setOpenModalEliminar(true)}
      >
        Eliminar
      </Button>
    </Box>
  )
}

export default Buttons