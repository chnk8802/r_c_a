import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Delete } from '@mui/icons-material';
import Charts from './Charts';
import Table from './Table';
import AddForm from './AddData';
import { IconButton } from '@mui/material';
import AlertDialog from './AlertDialog';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Report" {...a11yProps(0)} />
          <Tab label="Add Data" {...a11yProps(1)} />
          <Tab label="Dashboard" {...a11yProps(2)} />
          <Tab label="Settings" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IconButton color='error'>
          {/* <Delete /> */}
        </IconButton>
        <Table />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* sx={{ width: isSmallDevice ? '100%' : '50%' }} */}
          <Box>
            <Charts />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: '1rem' }}>Logout&nbsp;&nbsp;&nbsp;&nbsp;👉</Typography>
          <AlertDialog />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}