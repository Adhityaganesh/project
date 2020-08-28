import express from 'express';
const router=express.Router();
import shopController from '../controllers/shoppingController'

let controller=new shopController();

router.post('/create',controller.accountCreate);

router.post('/login',controller.accountLogin)

router.post('/encrypt',controller.encryptionAlgorithm);

router.post('/verify',controller.verification);

router.post('/qrcode',controller.qrVerification);

router.post('/paypal',controller.razorPay);


module.exports=router;