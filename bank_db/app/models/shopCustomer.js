import mongoose from 'mongoose'
const bankHistory=mongoose.Schema({
    unique_id:Number,
    accountNo:String,
    transactionType:String,
    transactionAmount:Number,
    transactionDate:String
});

module.exports=mongoose.model('bankHistory',bankHistory);