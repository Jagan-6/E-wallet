const mongoose=require('mongoose');

const Transaction=mongoose.Schema({
    accountNumber:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Transaction',Transaction);