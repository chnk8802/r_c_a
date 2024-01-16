import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar, Alert } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userState } from '../context/UserProvider';

const columns = [
  { field: 'month', headerName: 'Month', width: 150 },
  { field: 'sale', headerName: 'Sale (INR)', width: 150 },
  { field: 'id', headerName: 'ID', width: 250 },
];

export default function Table() {
  const { user } = userState();
  const [saleData, setSaleData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!user) {
      console.log("No userInfo yet")
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get('/api/sale', config);
      setSaleData(data);
    } catch (error) {
      console.log(error);
      setError(true);
      setAlert(error.response.data.error);
      setOpen(true)
    }
  }
  useEffect(() => {
    fetchData();
  }, [user]);

  // useEffect(() => {
  //   console.log(rowSelectionModel)
  // }, [rowSelectionModel])

  const rows = saleData?.map((s) => ({
    id: s._id,
    month: s.month,
    sale: s.sale
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }
  return (
    <div style={{ height: "85vh", width: '100%' }}>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose} sx={{ width: '50%' }}>
        <Alert onClose={handleClose} variant='filled' severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </div>
  );
}
