import { Box, Button, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import styleModal from '../Clientes/styleModal'
import { useTheme } from '@emotion/react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


function ModalEstado(open: boolean) {
  const theme = useTheme()

  const pedidos = [
    { id: 1, estado: "Pendiente" },
    { id: 2, estado: "Finalizado" },
    { id: 3, estado: "Finalizado" },
    { id: 4, estado: "Pendiente" },
  ]


  return (
    <div>
      <Modal open={open} onClose={() => console.log('asd')}>
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
            <Typography variant='body1' textAlign='start' component='h3'>
              Vas a cambiar los estados de los siguientes pedidos:
            </Typography>
            <List>
              {pedidos.map((element, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      ID: {element.id},
                      Estado:
                      <span style={{ marginLeft: 5, color: element.estado === "Pendiente" ? 'red' : 'green', fontWeight: '600' }}>{element.estado}</span>
                      <ArrowRightAltIcon />
                      <span style={{ marginLeft: 5, color: element.estado === "Pendiente" ? 'green' : 'red', fontWeight: '600' }}>{element.estado === "Pendiente" ? "Finalizado" : "Pendiente"}</span>

                    </Box>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
              <Button variant='contained' color='error'>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='success'
              >
                Aceptar
              </Button>
            </Box>
          </Box>

        </Box>
      </Modal>
    </div>
  )
}

export default ModalEstado