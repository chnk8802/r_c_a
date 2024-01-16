import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton variant="contained" color='error' onClick={handleClickOpen}>
        <PowerSettingsNewIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You decided to logout
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Logout</Button>
          <Button onClick={handleClose} autoFocus variant='contained'>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}