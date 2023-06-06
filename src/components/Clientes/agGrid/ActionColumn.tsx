import { Box, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import CUSTOMER from "../../../types/CUSTOMER";

interface ActionColumnParams {
  node: {
    data: CUSTOMER
  };
  handleUpdate: (profile: CUSTOMER) => void;
}

function ActionColumn(params: ActionColumnParams) {
  const { node, handleUpdate } = params;
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
        onClick={() => handleUpdate(node.data)}
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