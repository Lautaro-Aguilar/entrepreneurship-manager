import { Box, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import CUSTOMER from "../../../types/CUSTOMER";

interface ActionColumnParams {
  node: {
    data: CUSTOMER
  };
  modificar: (profile: CUSTOMER) => void;
}

function ActionColumn(params: ActionColumnParams) {
  const { node, modificar } = params;
  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        wrap: "wrap",
      }}
    >
      <IconButton
        onClick={() => modificar(node.data)}
        color='primary'
        title='Editar'
        style={{ padding: 0 }}
      >
        <Edit />
      </IconButton>
    </Box>
  );
}

export default ActionColumn;