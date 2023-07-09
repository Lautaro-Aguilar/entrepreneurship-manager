import Card from "./Card";
import { AttachMoney, Paid, Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import FakeCard from "./FakeCard";

interface Props {
  cardData: any;
  isWorking: boolean;
}

function CardList({ cardData, isWorking }: Props) {
  return (
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
  );
}

export default CardList;
