import { AttachMoney, Paid, Person } from "@mui/icons-material";
import { Box, Container, TextField, Typography } from "@mui/material";
import Card from "./Card";
import ChartBar from "./ChartBar";
import SellsCard from "./SellsCard";
import { useEffect, useState } from "react";
import * as useCases from "../../services/dashboard.useCases";
import ORDER from "../../types/ORDER";
import formatDate from "../../utils/formatDate";

function useDashboard() {
  const [cardData, setCardData] = useState({
    clientsCount: 0,
    profit: 0,
    sells: 0,
  });

  const [lastSells, setLastSells] = useState<ORDER[] | undefined>([]);

  useEffect(() => {
    useCases
      .getDashboardInitialData(
        new Date("2023-06-01 00:00:00"),
        new Date("2023-07-11 00:00:00")
      )
      .then((response) => {
        const { clientsCount, profit, sells, lastSellsResponse } =
          response.data;
        setCardData({ clientsCount, profit, sells });
        setLastSells(lastSellsResponse);
      });
  }, []);

  return { cardData, lastSells };
}

const Dashboard = () => {
  const { cardData, lastSells } = useDashboard();

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
          title='Total Ventas'
          // footer='40% more than last month'
          icon={<Paid />}
          text={`$${cardData.sells}`}
        />
        <Card
          title='Ganacia'
          // footer='10% more than last month'
          icon={<AttachMoney />}
          text={`$${cardData.profit}`}
        />
        <Card
          title='Clientes nuevos'
          // footer='20% less than last month'
          icon={<Person />}
          text={`+${cardData.clientsCount}`}
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
          {lastSells &&
            lastSells.map((sell: ORDER) => (
              <SellsCard
                customerName={sell.cliente}
                date={sell.fecharealizado}
                total={sell.total}
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
/* 

*/
