import { Box } from '@mui/material'
import logo from "./logo.png"
import client from '../../supabase/supabase'

function Inicio() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'red', minHeight: '100%', px: 0 }} className="pruebaImagen">
      <img src={logo} alt="Logo de la página" />
    </Box>
  )
}

export default Inicio