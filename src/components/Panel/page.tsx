import { AttachMoney, Paid, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Card from "./Components/Card";
import ChartBar from "./Components/ChartBar";
import SellsCard from "./Components/SellsCard";
import ORDER from "../../types/ORDER";
import formatDate from "../../utils/formatDate";
import useDashboard from "./useDashboard";
import FakeSellCard from "./Components/FakeSellCart";
import FakeCard from "./Components/FakeCard";

const Dashboard = () => {
  const {
    cardData,
    lastSells,
    dates,
    handleChangeDates,
    isWorking,
    chartBarData,
  } = useDashboard();

  return (
    <Container
      sx={{
        margin: "20px auto",
        padding: "20px 0px",
        border: "2px solid #e85d04",
        borderRadius: 4,
      }}
      maxWidth='lg'
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
            name='from'
            label='Desde'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
            value={dates.from}
            onChange={handleChangeDates}
          />
          <TextField
            label='Hasta'
            name='until'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
            value={dates.until}
            onChange={handleChangeDates}
          />
          <Button
            variant='contained'
            color='info'
            onClick={() => console.log(dates)}
          >
            Buscar
          </Button>
        </Box>
      </Box>
      <Box display='flex' gap={3} justifyContent='space-between' py={2} my={3}>
        {isWorking ? (
          <>
            <FakeCard />
            <FakeCard />
            <FakeCard />
          </>
        ) : (
          <>
            <Card
              title='Total Ventas'
              icon={<Paid />}
              text={`$${cardData.sells}`}
            />
            <Card
              title='Ganacia'
              icon={<AttachMoney />}
              text={`$${cardData.profit}`}
            />
            <Card
              title='Clientes nuevos'
              icon={<Person />}
              text={`+${cardData.clientsCount}`}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignContent: "center",
        }}
        justifyContent='space-between'
      >
        <Box
          display='flex'
          flexDirection='column'
          alignSelf='center'
          width='65%'
        >
          {isWorking ? (
            <Box width={50} margin='auto'>
              <CircularProgress color='primary' />
            </Box>
          ) : (
            <ChartBar charData={chartBarData} />
          )}
        </Box>
        <Box display='flex' flexDirection='column' width='30%' gap={3}>
          <Typography variant='h4' fontWeight='bold'>
            Últimas ventas
          </Typography>
          {isWorking ? (
            <>
              <FakeSellCard />
              <FakeSellCard />
              <FakeSellCard />
            </>
          ) : (
            lastSells &&
            lastSells.map((sell: ORDER) => {
              const formatedDate = formatDate(
                new Date(sell.fecharealizado),
                true
              );
              return (
                <SellsCard
                  customerName={sell.cliente}
                  date={formatedDate}
                  total={sell.total}
                />
              );
            })
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
/* 

*/
