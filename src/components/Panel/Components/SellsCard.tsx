import { AttachMoneyRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface SellsCard {
  customerName?: string;
  total?: number;
  date?: string | Date;
}

const SellsCard = ({ customerName, date, total }: SellsCard) => {
  return (
    <Box
      sx={{
        border: "3px solid #E68F00",
        padding: "10px 16px",
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        pl={2}
      >
        <Typography variant='h5' fontWeight='bold'>
          {customerName}
        </Typography>
        <Typography fontWeight='bold'>{`$${total}`}</Typography>
        <Typography fontSize='.8em' sx={{ color: "rgb(132, 132, 132)" }}>
          {date?.toString()}
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        width={50}
      >
        <AttachMoneyRounded fontSize='large' />
      </Box>
    </Box>
  );
};

export default SellsCard;
