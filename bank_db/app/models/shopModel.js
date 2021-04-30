const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    unique_id:Number,
    userName:String,
    password: String,
    emailAddress:String,
    phoneNo:Number,
    cardNumber:Number,
    cvv:Number
});

module.exports = mongoose.model('shop', shopSchema);
