const express = require('express');
const shop = require ('../models/shopModel');//model for creating the bank account
const sha512 = require('js-sha512');//Using sha-512 algorithm for password encryption.
const response = require('../../config.json');
const { db } = require('../models/shopModel');
const router = express.Router();
const helper = require("../../helper");
const jwt = require("jsonwebtoken");
let token;

router.post("/login", async(req,res)=>{
    try{ 
    const body = {"emailAddress":req.body.emailAddress,"password":sha512(req.body.password)};
    let value = await db.collection("userDetails").findOne(body);
    token = helper.jwtSign(body);
    if(value){
        return res.success("Login Successful");
    }
    return res.failure("Sorry , wrong username or password! Please try again.")
    }
    catch(err){
        return res.failure("Something is wrong! This is on our end. Please try after sometime");
    }
})
router.post("/answer_question",async(req,res)=>{
    try{
    let value = helper.jwtVerify(token);
    if(value){
    return res.success("Verified successfully");
    }
    return res.failure("Please login to continue");
    }
    catch(err){
        return res.failure("Sorry , please try again!")
    }
})

module.exports = router;