import React,{useState} from 'react';
import {
  useHistory,
} from "react-router-dom";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux"
import {actions} from "../action/index"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Jagan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch=useDispatch();
  const {action}= bindActionCreators(actions,dispatch);
  //const ac= bindActionCreators(actions,dispatch);
 // console.log(ac);
  const initialValues = {
    emailId: "",
    password: ""
  };
  const [values,setValues]=useState(initialValues);
  const handleInputChange=e=>{
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

  }
  async function handleSignInService()
  {
    axios
      .post('http://100.27.41.18:3001/sign-in',
        values).then((response)=>{
        console.log(response.data);
        action(response.data);
        if(response.data.accountNumber!==undefined)
        {
          handleClick();
          console.log('success')
        }
        else{
          alert("Email Id or Password is Invalid")
        }
      })

  }
  function handleClick() {
    history.push({
      pathname:'/home',
     // props:values
    });
  }

  const handleSignIn=()=>{
    handleSignInService(); 
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="emailId"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
             <Button
         //   type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}