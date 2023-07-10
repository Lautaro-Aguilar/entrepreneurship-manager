import { IconButton, IconButtonProps, styled } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const Expandir = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  console.log(other);
  return <IconButton {...other} color='primary' />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default Expandir;
