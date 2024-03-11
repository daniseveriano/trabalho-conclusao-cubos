/* eslint-disable react/jsx-no-bind */
import './styles.css';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Snackbar } from '@mui/material';

export default function PopUpCharge({ onCloseClick, open }) {
  return (
    <Snackbar open={open} autoHideDuration={4500} onClose={onCloseClick} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

      <Alert
        onClose={onCloseClick}
        severity="info"
        icon={(
          <CheckCircleOutlineIcon
            fontSize="inherit"
            sx={{ color: '#243F80' }}
          />
        )}
        sx={{ width: '100%' }}
      >
        Cobrança cadastrada com sucesso!
      </Alert>
    </Snackbar>
  );
}
