import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {BrowserRouter} from 'react-router-dom'

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ThemeProvider theme={darkTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
  </BrowserRouter>
)
