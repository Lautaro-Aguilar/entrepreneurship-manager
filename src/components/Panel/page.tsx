import {
  Box,
  Button,
  Container,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import useDashboard from "./useDashboard";
import DataChart from "./Components/DataChart";
import SellsList from "./Components/SellsList";
import CardList from "./Components/CardList";

const Dashboard = () => {
  const {
    cardData,
    lastSells,
    dates,
    handleChangeDates,
    isWorking,
    chartBarData,
    handleBusquedaDatos,
  } = useDashboard();

  const theme: Theme = useTheme();

  return (
    <Container
      sx={{
        margin: "20px auto",
        padding: "20px 0px",
        border: `2px solid ${theme.palette.primary.main}`,
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
            type='date'
            InputLabelProps={{ shrink: true }}
            value={dates.from}
            onChange={handleChangeDates}
          />
          <TextField
            label='Hasta'
            name='until'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={dates.until}
            onChange={handleChangeDates}
          />
          <Button
            variant='contained'
            color='info'
            onClick={handleBusquedaDatos}
          >
            Buscar
          </Button>
        </Box>
      </Box>
      <CardList cardData={cardData} isWorking={isWorking} />
      <Box
        display='flex'
        flex={1}
        alignContent='center'
        justifyContent='space-between'
      >
        <DataChart chartBarData={chartBarData} isWorking={isWorking} />
        <SellsList isWorking={isWorking} lastSells={lastSells} />
      </Box>
    </Container>
  );
};

export default Dashboard;
/* 

*/
