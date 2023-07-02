import { AttachMoney } from "@mui/icons-material";
import { Box, Container, TextField, Typography } from "@mui/material";
import React from "react";

interface CardProps {
  title: string;
  footer: string;
  text: string;
  icon: React.JSX.Element;
}

const Card = ({ title, text, footer, icon }: CardProps) => {
  return (
    <Box
      width={300}
      sx={{ border: "2px solid #e85d04", borderRadius: 1, padding: 2 }}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='subtitle1'>{title}</Typography>
        {icon}
      </Box>
      <Box>
        <Typography>{text}</Typography>
      </Box>
    </Box>
  );
};

const page = () => {
  return (
    <Container
      sx={{ padding: "20px 0px", border: "2px solid #e85d04", borderRadius: 1 }}
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
      <Box>
        <Card
          title='Ganacia'
          footer='10% more than last mont'
          icon={<AttachMoney />}
          text='$140.200'
        />
      </Box>
    </Container>
  );
};

export default page;
