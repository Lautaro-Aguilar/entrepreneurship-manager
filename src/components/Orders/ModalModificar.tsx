import React, { useEffect, useState } from 'react'
import { Box, Typography, Modal, Autocomplete, TextField, Button, InputAdornment } from '@mui/material'
import ORDER from '../../types/ORDER';
import { useTheme } from '@emotion/react';
import useOrders from './useOrders';
import CUSTOMER from '../../types/CUSTOMER';

interface SELECTEDORDER {
  cliente: string,
  cantidades: string,
  estado: string,
  fechaentrega: string,
  fecharealizado: string,
  idpedido: number,
  productos: string,
  sena: number,
  total: 41
}

type ModalModificarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder: SELECTEDORDER[];
};

function ModalModificar({ open, setOpen, selectedOrder }: ModalModificarProps) {
  const { customers, formDataOrder, setFormDataOrder } = useOrders()
  const theme: any = useTheme();
  const handleClose = () => setOpen(false);
  const [clientToModify, setClientToModify] = useState<CUSTOMER>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: ""
  })
  const [orderToModify, setOrderToModify] = useState<SELECTEDORDER>()

  useEffect(() => {
    setOrderToModify(selectedOrder[0])
    if (orderToModify) {
      const clienteAModificar = customers.find(customer => `${customer.nombre} ${customer.apellido}` === orderToModify.cliente);
      setClientToModify(clienteAModificar || {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: ""
      });
    }
    console.log(orderToModify, selectedOrder[0])
  }, [open, selectedOrder]);

  const handleSubmit = () => {
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 5,
        }}>
          <Box
            className='headerModal'
            px={2}
            py={1}
            borderRadius={"10px 10px 0px 0px"}
            bgcolor={theme.palette.success.main}
            color='theme.palette.success.contrastText'
          >
            <Typography
              id='modal-modal-title'
              variant='h6'
              fontWeight={600}
              component='h2'
            >
              Nuevo Pedido
            </Typography>
          </Box>

          <Box
            className='bodyModal'
            px={2}
            py={2}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            borderRadius={"0px 0px 10px 10px"}
          >

            <Autocomplete
              disablePortal
              options={customers}
              value={clientToModify}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.nombre} {option.apellido}
                  </li>
                )
              }}
              getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
              fullWidth
              onChange={(event, value) => {
                setFormDataOrder({ ...formDataOrder, idcliente: value?.id })
              }}
              renderInput={(params) => (
                <TextField {...params} label='Cliente' />
              )}
            />

            <TextField
              label='Fecha de Entrega'
              type='datetime-local'
              InputLabelProps={{ shrink: true }}
              value={orderToModify?.fechaentrega}
              onChange={(e) => { setFormDataOrder({ ...formDataOrder, fechaentrega: e.target.value }) }}
            />

            <TextField
              label='Seña'
              type='number'
              value={orderToModify?.sena}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFormDataOrder({ ...formDataOrder, sena: value })
              }}
              InputLabelProps={{ shrink: true }}
            />

            <Box
              bgcolor={theme.palette.success.dark}
              display='flex'
              py={1}
              px={1}
              flexDirection='column'
              justifyContent='space-between'
            >
              <Box display='flex' justifyContent='space-between'>
                <Typography
                  variant='h6'
                  component='h6'
                  textTransform='uppercase'
                  fontWeight='bold'
                  display='inline-block'
                >
                  Total
                </Typography>
                <Typography
                  variant='h6'
                  component='h6'
                  fontWeight='bold'
                  display='inline-block'
                >
                  ${orderToModify?.total}
                </Typography>
              </Box>

            </Box>
          </Box>
          <Box display='flex' justifyContent='flex-end' gap={2} mr={2} mb={2}>
            <Button variant='contained' color='error'>
              Cancelar
            </Button>
            <Button variant='contained' color='success' onClick={handleSubmit}>
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalModificar