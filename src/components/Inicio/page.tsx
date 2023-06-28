import { Box } from '@mui/material'
import logo from "./logo.png"
import client from '../../supabase/supabase'

function Inicio() {
  const handleLogin = async () => {
    const result = await client.auth.signInWithPassword({
      email: "aguilarlautaroexequiel867@gmail.com",
      password: "S8aWPnPiAsx2UK"
    })
    console.log(result)
  }
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'red', minHeight: '100%', px: 0 }} className="pruebaImagen">
        <img src={logo} alt="Logo de la página" />
      </Box>
      <input type="button" value="login" onClick={handleLogin} />
      <input type="button" value="login" onClick={() => console.log(client.auth.getSession())} />
    </div>
  )
}

export default Inicio