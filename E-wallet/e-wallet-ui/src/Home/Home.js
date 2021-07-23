import React from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Profile from '../Profile/Profile';
import Wallet from '../wallet/wallet';
import {useSelector} from "react-redux";
import { Button } from '@material-ui/core';

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let history = useHistory();
  const response=useSelector((state)=>state.info);
console.log(response)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Wallet" {...a11yProps(1)} />
          <Button style={{display: 'block',marginLeft: 'auto'}} 
          variant="contained" color="secondary" onClick={()=>{history.push({
            pathname:'/login',
           // props:values
          });}}>
            Logout</Button>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Profile data = {response}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Wallet data={response}/>
      </TabPanel>
    </div>
  );
}