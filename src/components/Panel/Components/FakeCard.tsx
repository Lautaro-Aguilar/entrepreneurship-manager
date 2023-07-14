import { Box, Skeleton, Theme, Typography, useTheme } from "@mui/material";

const FakeCard = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      width={300}
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        padding: 2,
      }}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h6'>
          <Skeleton width={100} />
        </Typography>
        <Skeleton animation='wave' variant='circular' width={30} height={30} />
      </Box>
      <Typography component='h4' variant='h4' fontWeight='bold'>
        <Skeleton width={150} />
      </Typography>
    </Box>
  );
};

export default FakeCard;
