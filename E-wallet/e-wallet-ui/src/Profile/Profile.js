import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    minWidth: 444,
    alignContent:'center'
  },
});

export default function Profile({data}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
         <CardContent>
           <div style={{display: 'block',marginLeft: 'auto',width: '54%'}}>
         <Avatar style={{width:100,height:100}} src="/icon.jpg" />
         </div>
        <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">First Name:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}>{data.firstName}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Last Name:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}> {data.lastName}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Account No:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}>{data.accountNumber}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Address:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}>{data.address}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Phone number:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}>{data.phoneNumber}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Email Id:
          </Typography> <Typography variant="h5" component="h2" style={{display: 'inline-block'}}>{data.emailId}</Typography>
      </CardContent>
    </Card>
  );
}
