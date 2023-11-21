import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAthlete from './AddAthlete';
import AddWorkout from './AddWorkout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#212121',
    },
  },
  // typography: {
  //   fontSize: '24'
  // }
});

function TabPanel(props) {
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
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

function TabsModal(props) {
    const [value, setValue] = useState(0);
    const [active, setActive] = useState(true);
    const [active2, setActive2] = useState(false);
    const [visible, setVisible] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
      setActive(false);
      setActive2(true);
      setVisible(false);
    }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
      <Tabs sx={{ fontSize: '24'}} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab  label="Add An Athlete" {...a11yProps(0)} disabled={active2} />
        <Tab color='primary' label="Add A Workout" {...a11yProps(1)} disabled={active} />
        
      </Tabs>
    </Box>
    <TabPanel value={value} index={0} children={<AddAthlete handleSubmit={handleSubmit}  />}>      
    </TabPanel>
    <TabPanel value={value} index={1} children={ <AddWorkout />} >      
    </TabPanel>
  </Box>
  
    </ThemeProvider>
    
  )
}

export default TabsModal