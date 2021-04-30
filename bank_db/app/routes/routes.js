const express = require("express");
const router=express.Router();
const shopController = require('../controllers/mainController');

router.use("/shop",shopController);


module.exports=router;