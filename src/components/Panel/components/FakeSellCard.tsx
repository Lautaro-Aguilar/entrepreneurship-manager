import { Box, Skeleton, Theme, Typography, useTheme } from "@mui/material";

const FakeSellCard = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        border: `3px solid ${theme.palette.primary.main}`,
        padding: 1,
        borderRadius: 3,
        display: "flex ",
        gap: 5,
      }}
    >
      <Box display='flex' flexDirection='column' pl={2}>
        <Typography variant='h5' fontWeight='bold'>
          <Skeleton width={150} />
        </Typography>
        <Typography fontWeight='bold'>
          <Skeleton />
        </Typography>
        <Typography fontSize='.8em' sx={{ color: "rgb(132, 132, 132)" }}>
          <Skeleton />
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' margin='auto'>
        <Skeleton animation='wave' variant='circular' width={40} height={40} />
      </Box>
    </Box>
  );
};

export default FakeSellCard;
