import { Box, Theme, Typography, useTheme } from "@mui/material";

interface CardProps {
  title: string;
  footer?: string;
  text: string | number;
  icon: React.ReactNode;
}

const Card = ({ title, text, /* footer, */ icon }: CardProps) => {
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
        <Typography variant='h6'>{title}</Typography>
        {icon}
      </Box>
      <Typography component='h4' variant='h4' fontWeight='bold'>
        {text}
      </Typography>
      {/* <Typography sx={{ color: "rgb(132, 132, 132)" }}>{footer}</Typography> */}
    </Box>
  );
};

export default Card;
