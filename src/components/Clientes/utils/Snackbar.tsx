import { Alert, Snackbar } from '@mui/material';

interface SnackbarAlertProps {
  mensaje: string;
  isRemoveSnackBarOpen: boolean;
  closeRemoveSnackBar: () => void
}

function SnackbarAlert(props: SnackbarAlertProps) {
  return (
    <Snackbar open={props.isRemoveSnackBarOpen} autoHideDuration={6000} onClose={props.closeRemoveSnackBar}>
      <Alert onClose={props.closeRemoveSnackBar} severity="success" sx={{ width: "100%" }}>
        {props.mensaje}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert