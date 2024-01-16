import React, { useState, useEffect, useContext } from 'react';
import { TextField, Autocomplete, Container, Grid, Button } from '@mui/material';
import { userState } from '../context/UserProvider';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AddData = () => {
  const { user } = userState()
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [numberValue, setNumberValue] = useState('');

  const handleNumberChange = (event) => {
    setNumberValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requiredFields = ['month', 'sale'];
    const isFormValid = requiredFields.every(field => data.get(field));

    if (!isFormValid) {
      setAlert('Please fill in all required fields.');
      setOpen(true)
      return;
    }
    const payload = {
      month: data.get('month'),
      sale: Number(data.get('sale')),
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post('/api/sale/', payload, config);
      setError(false);
      setAlert(data);
      setOpen(true);
    } catch (error) {
      console.log(error)
      setError(true);
      setAlert(error.response.data.error);
      setOpen(true)
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose} sx={{ width: '50%' }}>
        <Alert onClose={handleClose} variant='filled' severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      <Grid component='form' onSubmit={handleSubmit} container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={months}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField name="month" {...params} label="Select Month" />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: 300 }}
            fullWidth
            label="Sale"
            name="sale"
            type="number"
            id="number"
            value={numberValue}
            onChange={handleNumberChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" type='submit'>
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddData;