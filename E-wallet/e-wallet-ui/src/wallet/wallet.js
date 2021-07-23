import React,{ useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 444,
  },
  textField: {
    width: '200px',
  },
});

export default function Wallet({data}) {
  const classes = useStyles();
  const [sendMoney, setSendMoney] = useState(false);
  const [balance,setBalance]=useState(data.amount);
  const initialValues = {
    toAccountNumber: "",
    amount: ""
  };
  const [values,setValues]=useState(initialValues);
  const handleInputChange=e=>{
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

  }
  async function handleSendMoneyService()
  {
    axios
      .post('http://100.27.41.18:3001/send-money',
      {...values,"fromAccountNumber" : data.accountNumber}).then((response)=>{
        console.log(response.data);
        console.log(response.data.updatedFromAmount);
        setBalance(response.data.updatedFromAmount);
        console.log(balance);
        alert(`Money sent to ${values.toAccountNumber} was successful`)
      })

  }

  const handleSendMoney=()=>{
      console.log("values "+values);
       handleSendMoneyService(); 
  }
  return (
      <div>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Account Number: {data.accountNumber}
        </Typography>
        <br/><br/>
        <h3>Balance</h3>
        <p>{"₿"+balance}</p>
      </CardContent>
      <CardActions style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Button
        color="primary" variant="contained" size="small" onClick={()=>{setSendMoney(!sendMoney)}}>Money Transfer</Button>
      </CardActions>
    </Card>
    <br/><br/>
    {sendMoney?
    <Card>
       <CardContent style={{
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
        }}>
          <TextField
          id="filled-read-only-input"
           label="Account Number"
           name="toAccountNumber"
          variant="outlined"
          onChange={handleInputChange}
        />
          <TextField
          id="filled-read-only-input"
           label="Amount"
           name="amount"
          variant="outlined"
          onChange={handleInputChange}
        />
        </CardContent> 
        <CardActions style={{
            display: "flex",
            flexDirection:"column",
            alignItems: "flex-end"
        }}>
        <Button
        color="primary" variant="contained" size="small" onClick={handleSendMoney}>send Money</Button>
      </CardActions>
    </Card>
    :null}
    </div>
  );
}
