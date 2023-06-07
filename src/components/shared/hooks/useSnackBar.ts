import { AlertColor } from "@mui/material";
import { useState } from "react";

interface SNACKOPTIONS {
  message: string;
  variant: AlertColor;
}

export default function useSnackBar() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackOptions, setSnackOptions] = useState<SNACKOPTIONS>({
    message: "",
    variant: "info",
  });
  const openSnackBar = (alertVariant: AlertColor, alertMessage: string) => {
    setIsSnackBarOpen(true);
    setSnackOptions({ message: alertMessage, variant: alertVariant });
    setTimeout(() => {
      setIsSnackBarOpen(false);
    }, 5000);
  };

  const closeSnackBar = () => setIsSnackBarOpen(false);

  return { openSnackBar, isSnackBarOpen, snackOptions, closeSnackBar };
}
