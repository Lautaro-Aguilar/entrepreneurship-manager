import ORDER from "../../../types/ORDER";
import { Box, Typography } from "@mui/material";
import FakeSellCard from "../components/FakeSellCard";
import formatDate from "../../../utils/formatDate";
import SellsCard from "./SellsCard";

interface Props {
  isWorking: boolean;
  lastSells: ORDER[] | undefined;
}

const SellsList = ({ isWorking, lastSells }: Props) => {
  return (
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
          const formatedDate = formatDate(new Date(sell.fecharealizado), true);
          return (
            <SellsCard
              key={sell.idpedido}
              customerName={sell.cliente}
              date={formatedDate}
              total={sell.total}
            />
          );
        })
      )}
    </Box>
  );
};

export default SellsList;
