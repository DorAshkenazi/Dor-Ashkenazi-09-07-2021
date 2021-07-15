// React Material-UI
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../redux/snackbarSlice";

export const PromptSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state: any) => state.snackbar);

  const handleSnackbarClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={snackbarState.isOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarState.color === "green" ? "success" : "error"}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};
