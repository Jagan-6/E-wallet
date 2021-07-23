const express=require('express')
const bodyParser=require('body-parser')
const app=express();
const mongoose = require('mongoose');
const UserInfo=require('./models/UserInfo')
const Transaction=require('./models/Transaction')
const cors = require('cors')
var nodemailer = require('nodemailer');
app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ewallet.services.test@gmail.com',
      pass: 'ewallet123'
    }
  });
  
app.use(express.json());
app.post('/sign-up',(req,res)=>{
    console.log("request && ");
    console.log(req.body);
    let response={
        status:"success"
    };
    let accNo=Math.floor(Math.random() * 100000000000);
    const userInfo=new UserInfo({
        accountNumber:""+accNo,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,
        emailId:req.body.emailId,
        password:req.body.password
    });
    userInfo.save().
    then(data=>{
        const transaction=new Transaction({
            accountNumber:""+accNo,
            from:'initialAmount',
            amount:req.body.initialAmount
        });
        transaction.save().
        then(dat=>{
            console.log(dat);
            var mailOptions = {
                from: 'ewallet.services.test@gmail.com',
                to:req.body.emailId,
                subject: 'Welcome! Thanks for signing up with E-wallet!',
                text: 'Hello there, You’re receiving this email because you recently created a new E-wallet account. If this wasn’t you, please ignore this email.'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }); 
        });
        console.log(data);
        res.send(response);
    })
   .catch((err)=>{
    response.status="Failure";
    console.log(err);
    res.send(response);
}) 
});
app.post('/sign-in',async (req,res)=>{
    let userEmail=req.body.emailId;
    let password=req.body.password;
    console.log(userEmail+" "+password);
    let success=false;
    try{
    let userInfos= await UserInfo.find();
    let accountNo="",result={};
    // console.log(userInfos);
    userInfos.forEach((value)=>{
       // console.log(value);
        if(value.emailId===userEmail)
        {
            console.log('email '+userEmail)
            if(value.password===password)
            {
               // let result=value;
               result={... value};
               console.log(result);
                console.log('password '+password);
                accountNo=value.accountNumber;
                result.password=undefined;
             //   value.status="success";
                success=true;
            }
        }
    });
    var query = { accountNumber:accountNo };
    var sort={addedDate:-1};
    console.log(accountNo)
                let transaction= await Transaction.findOne(query).sort(sort);
                console.log('transaction '+transaction);
                console.log(result._doc);
                result={... result._doc, "amount":transaction.amount}
    if(!success)
    res.send({status:"failure"});
    else
    res.send(result);
    console.log(result);
    }
    catch(err){
        res.send({message:err});
    }
});
app.post('/send-money',async (req,res)=>{
   let fromAccountNumber= req.body.fromAccountNumber;
   let toAccountNumber= req.body.toAccountNumber;
   let amount =req.body.amount;
   let transactions=await Transaction.find();
   let done1=false,done2=false;
   let updatedToAmount=0,updatedFromAmount=0;
   var bar = new Promise((resolve, reject) => {
    transactions.forEach((value,index)=>{
       console.log(value);
       console.log(fromAccountNumber+" "+toAccountNumber);
    if(value.accountNumber===toAccountNumber){
        updatedToAmount=parseFloat(value.amount)+parseFloat(amount);
        const transaction=new Transaction({
            accountNumber:toAccountNumber,
            from:fromAccountNumber,
            amount:updatedToAmount
        });
        console.log(transaction);
        transaction.save().
        then(dat=>{
            // Transaction.remove({_id:value._id}).then(()=>{
            //     console.log(dat); 
            //     done1=true;
            // });
            console.log(dat);
            done1=true;
        });
        
        
    }
    else if(value.accountNumber===fromAccountNumber){
         updatedFromAmount=parseFloat(value.amount)-parseFloat(amount);
        const transaction=new Transaction({
            accountNumber:fromAccountNumber,
            from:toAccountNumber,
            amount:updatedFromAmount
        });
        transaction.save().
            then(dat=>{
                // Transaction.remove({_id:value._id}).then(()=>{
                //     console.log(dat); 
                //     done2=true;
                // });
                console.log(dat); 
                    done2=true;
            });
        
        
    }
    console.log("index "+index+" length "+transactions.length+" done1 "+done1+" done 2"+done2)
    if(index===transactions.length-1||(done1&&done2))
    resolve();
   })
});
// bar.then(() => {
//     res.json({status:"success"});
// });
res.json({status:"success",updatedFromAmount:updatedFromAmount});
});
mongoose.connect('mongodb+srv://jagan:123@cluster0.o9wr4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useUnifiedTopology: true },
()=>{console.log('DB Connected')})

app.listen(3001);