import { Alert, AlertColor, Snackbar } from "@mui/material";

interface Props {
  isSnackBarOpen: boolean;
  closeSnackBar: () => void;
  message: string;
  variant: AlertColor;
}

const SnackbarCustom = ({
  closeSnackBar,
  isSnackBarOpen,
  message,
  variant,
}: Props) => {
  return (
    <Snackbar open={isSnackBarOpen} onClose={closeSnackBar}>
      <Alert onClose={closeSnackBar} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
