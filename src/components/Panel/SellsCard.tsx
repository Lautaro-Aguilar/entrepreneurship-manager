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
        padding: 1,
        borderRadius: 3,
        display: "flex ",
        gap: 5,
      }}
    >
      <Box display='flex' flexDirection='column' pl={2}>
        <Typography variant='h5' fontWeight='bold'>
          {customerName}
        </Typography>
        <Typography fontWeight='bold'>${total}</Typography>
        <Typography fontSize='.8em'>{date?.toString()}</Typography>
      </Box>
      <Box display='flex' flexDirection='column' margin='auto'>
        <AttachMoneyRounded fontSize='large' />
      </Box>
    </Box>
  );
};

export default SellsCard;
