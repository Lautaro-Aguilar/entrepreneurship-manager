import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { CalendarMonth, CheckRounded } from "@mui/icons-material";
import OrderResponse from "../../types/OrderResponse";

type CardsProps = {
  handler: any;
  orders: OrderResponse[];
};

function Cards({ orders, handler }: CardsProps) {
  if (!orders.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth='xl'>
      <Grid
        container
        direction='row'
        columnSpacing={5}
        rowSpacing={5}
        justifyContent='start'
        alignItems='start'
      >
        {orders.length > 0 &&
          orders?.map((order) => {
            if (order.estado === "Pendiente") {
              let productos: any = order.productos;
              let cantidades: any = order.productos;

              if (!Array.isArray(productos)) {
                productos = productos.split(",");
              }
              if (!Array.isArray(cantidades)) {
                cantidades = cantidades.split(",");
              }

              return (
                <Grid key={order.idpedido} item xs={12} lg={6} xl={4}>
                  <Box
                    bgcolor='#fff'
                    maxWidth={400}
                    minWidth={400}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      margin: 0,
                      height: "100%",
                      boxShadow: "1px 2px 26px -7px rgba(255, 255, 255, 0.20)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5,
                        px: 2.5,
                        paddingTop: 2.5,
                      }}
                      className='headerCard'
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          title='Marcar como realizado'
                          color='primary'
                          onClick={() => handler(order)}
                        >
                          <CheckRounded color='success' sx={{ padding: 0 }} />
                        </IconButton>
                        <Box
                          sx={{
                            backgroundColor: "#ED8A8A",
                            borderRadius: "15px",
                            py: "3px",
                            px: "12.5px",
                          }}
                        >
                          <Typography
                            variant='body1'
                            component='p'
                            fontWeight='bold'
                            color='#EC2525'
                          >
                            {order.estado}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarMonth style={{ color: "#000" }} />
                        <Typography color='black' sx={{ fontWeight: 600 }}>
                          {order.fechaentrega?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      className='bodyCard'
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Box px={2} pt={1.5}>
                        <Typography
                          color='grey'
                          fontWeight='500'
                          variant='body2'
                          textTransform='uppercase'
                        >
                          Cliente: {order.cliente}
                        </Typography>
                      </Box>

                      <Box
                        className='productsList'
                        sx={{
                          maxHeight: "100px",
                          minHeight: "100px",
                          overflow: "auto",
                          px: 2,
                          pb: 0.5,
                        }}
                      >
                        {productos?.map((producto: string, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              my: 1,
                              bgcolor: "#E8E8E8",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 2,
                              borderRadius: "10px",
                              py: 0.5,
                            }}
                          >
                            <Typography color='black' fontWeight='bold'>
                              {producto}
                            </Typography>
                            <Typography color='black' fontWeight='bold'>
                              {cantidades[index]}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box
                      className='footerCard'
                      sx={{
                        borderTop: "1.5px solid #E8E8E8",
                        borderBottom: "1.5px solid #E8E8E8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2.5,
                        py: 1.5,
                      }}
                    >
                      <Typography color='black' variant='h5' fontWeight='bold'>
                        TOTAL
                      </Typography>
                      <Typography color='green' variant='h5' fontWeight='bold'>
                        ${order.total}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            }
            return null; // Si el estado no es "Pendiente", no se renderiza nada
          })}
      </Grid>
    </Container>
  );
}

export default Cards;
