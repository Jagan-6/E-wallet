const mongoose=require('mongoose');

const UserInfo=mongoose.Schema({
    accountNumber:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('UserInfo',UserInfo);