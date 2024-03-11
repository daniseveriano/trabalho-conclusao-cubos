import { Alert, Snackbar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function PoputResult({ result, onClose, successMessage }) {
  return (
    <Snackbar open={result.show} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <Alert
        icon={result.error ? <HighlightOffIcon htmlColor="#AE1100" /> : <CheckCircleOutlineIcon />}
        severity={result.error ? 'error' : 'info'}
        onClose={onClose}
      >
        {result.message ?? successMessage}
      </Alert>
    </Snackbar>
  );
}
