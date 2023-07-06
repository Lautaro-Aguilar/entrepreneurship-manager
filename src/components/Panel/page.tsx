import { AttachMoney, Paid, Person } from "@mui/icons-material";
import { Box, Container, TextField, Typography } from "@mui/material";
import Card from "./Card";
import ChartBar from "./ChartBar";
import SellsCard from "./SellsCard";

const page = () => {
  return (
    <Container
      sx={{
        margin: "20px auto",
        padding: "20px 0px",
        border: "2px solid #e85d04",
        borderRadius: 4,
      }}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography
          component='h1'
          variant='h3'
          fontWeight='bold'
          color='primary'
        >
          Panel de Control
        </Typography>
        <Box display='flex' gap={2}>
          <TextField
            label='Desde'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            label='Hasta'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>
      </Box>
      <Box display='flex' gap={3} justifyContent='space-between' py={2} my={3}>
        <Card
          title='Ganacia'
          footer='10% more than last month'
          icon={<AttachMoney />}
          text='$140.200'
        />

        <Card
          title='Total Ventas'
          footer='40% more than last month'
          icon={<Paid />}
          text='$170.500'
        />
        <Card
          title='Clientes nuevos'
          footer='20% less than last month'
          icon={<Person />}
          text='+15'
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignContent: "center",
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignSelf='center'
          width='70%'
        >
          <ChartBar />
        </Box>
        <Box display='flex' flexDirection='column' width='30%' gap={3}>
          <Typography variant='h4' fontWeight='bold'>
            Últimas ventas
          </Typography>
          <SellsCard
            customerName='Agustin Galante'
            date='20-06-2023'
            total={2500}
          />
          <SellsCard
            customerName='Lautaro Aguilar'
            date='20-06-2023'
            total={3500}
          />
          <SellsCard
            customerName='Marcos Reynoso'
            date='20-06-2023'
            total={5600}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default page;
