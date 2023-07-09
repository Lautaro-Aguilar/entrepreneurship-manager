import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import OrderResponse from '../../types/OrderResponse';

type CardsProps = {
  orders: OrderResponse[];
};

function Cards({ orders }: CardsProps) {

  if (!orders.length) {
    return <Typography>Loading...</Typography>;
  }


  return (
    <Grid container direction="row" justifyContent='flex-start' rowSpacing={1} rowGap={1} columnSpacing={10}>
      {orders.length > 0 && orders?.map((order) => {
        if (order.estado === "Pendiente") {
          console.log('productos: ', order.productos)
          const qts = order.cantidades
          const prd = order.productos
          const productos = prd.split(',');
          const cantidades = qts.split(',');

          return (
            <Grid key={order.idpedido} item xs={12} lg={6} xl={4}>
              <Box bgcolor="#fff" maxWidth={400} minWidth={400} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 0, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 5, px: 2.5, paddingTop: 2.5 }} className="headerCard">
                  <Box sx={{ backgroundColor: '#ED8A8A', borderRadius: '15px', py: '3px', px: '12.5px' }}>
                    <Typography variant='body1' component="p" fontWeight="bold" color="#EC2525">{order.estado}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonth style={{ color: '#000' }} />
                    <Typography color="black" sx={{ fontWeight: 600 }}>{order.fechaentrega?.toLocaleString()}</Typography>
                  </Box>
                </Box>

                <Box className="bodyCard" sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", gap: 1, }}>
                  <Box px={2} pt={1.5}>
                    <Typography color="grey" fontWeight="500" variant="body2" textTransform="uppercase">Cliente: {order.cliente}</Typography>
                  </Box>

                  <Box className="productsList" sx={{ maxHeight: '100px', overflow: 'auto', px: 2, pb: .5 }}>
                    {productos?.map((producto: string, index: number) => (
                      <Box key={index} sx={{ my: 1, bgcolor: "#E8E8E8", display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, borderRadius: "10px", py: .5 }}>
                        <Typography color="black" fontWeight="bold">{producto}</Typography>
                        <Typography color="black" fontWeight="bold">{cantidades[index]}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box className="footerCard" sx={{ borderTop: '1.5px solid #E8E8E8', borderBottom: '1.5px solid #E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 1.5 }}>
                  <Typography color="black" variant='h5' fontWeight="bold">TOTAL</Typography>
                  <Typography color="green" variant='h5' fontWeight="bold">{order.total}</Typography>
                </Box>
              </Box>
            </Grid>
          );
        }
        return null; // Si el estado no es "Pendiente", no se renderiza nada
      })}
    </Grid >
  );
}

export default Cards;
