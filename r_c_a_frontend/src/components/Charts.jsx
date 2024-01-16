import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { userState } from '../context/UserProvider';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export default function Charts() {
  const { user } = userState();
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [saleData, setSaleData] = useState([])
  const [month, setMonths] = useState([]);
  const [monthSale, setMonthSale] = useState([]);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.get('/api/sale', config);
        setSaleData(data);
      } catch (error) {
        setError(true);
        console.log(error)
        setAlert("error.response.data.error");
        setOpen(true);
      }
    }

    fetchData();
  }, [user])

  useEffect(() => {
    if (saleData.length === 0) {
      // console.log('No saleData yet')
      return;
    }
    const monthsArray = saleData.map((s) => s.month);
    const salesArray = saleData.map((s) => s.sale);
    setMonths(monthsArray);
    setMonthSale(salesArray);
    // console.log("---------", typeof monthsArray, monthsArray, typeof salesArray, salesArray, "---------");
    // console.log("=======",month,monthSale,"=======")
  }, [saleData]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  return (
    <>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose} sx={{ width: '50%' }}>
        <Alert onClose={handleClose} variant='filled' severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
      <BarChart
        yAxis={[{ scaleType: 'linear', label: 'sale (INR)', labelStyle: { border: '1px solid red' } }]}
        xAxis={[{ scaleType: 'band', data: (month.length !== 0) ? month : months, label: "Months" }]}
        series={[{ data: (monthSale.length !== 0 ? monthSale : data), color: '#FFA500' }]}
        height={500}
        width={isSmallDevice ? 500 : 1000}
        tooltip={{ trigger: 'item' }}
      />
    </>
  );
}