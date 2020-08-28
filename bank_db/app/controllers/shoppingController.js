import shop from '../models/shopModel'//model for creating the bank account
import sha512 from 'js-sha512'//Using sha-512 algorithm for password encryption.
import dbService from '../dbServices/dbActivity'//for dbActivity
import response from '../../config.json';
import twilio from 'twilio';
import qrcode from 'qrcode';
import RazorPay from 'razorpay';
let value, token;
let dbActivity = new dbService();
//controller class for accessing bank features
export default class shopController {
    //for creating bank account
    async accountCreate(req, res) {
        try{    
            let uniqueId = Date.now();
            let cardNo=Math.floor(Math.random()*100000000000000);
            let cvv=(Date.now());
            cvv=cvv.toString().slice(0,3);
            let details = new shop({
                unique_id: uniqueId, userName: req.body.userName, password: (req.body.password),
                emailAddress: req.body.emailAddress, phoneNo: req.body.phoneNo,cardNumber:cardNo,cvv:cvv
            });
        
            value = await dbActivity.accountCreation(details);
            return res.success(value);
        }
        catch (err) {
            return res.failure('sorry,cannot create account')
        }
    }
    //for logging in
    async accountLogin(req, res) {
        let userName = req.body.userName;
        let password = req.body.password;
        try{
            value = await dbActivity.login(userName, password);
            return res.success(value);
        }
        catch (err) {
            return res.failure('sorry,unable to login');
        }
    }
    async verification(req,res){
        let data={"userName":req.body.userName,"cardNumber":req.body.cardNumber,"cvv":req.body.cvv};
        dbActivity.verify(req,res,data);
    }
    async encryptionAlgorithm(req,res){
        try{
            let otp=Date.now();
            otp=otp.toString();
            otp=otp.slice(0,4);
            let details={"nameOnCard":req.body.nameOnCard,"cardNumber":req.body.cardNumber,"cvv":req.body.cvv};
            const client=twilio(response.twilioCredentials.accountSid,response.twilioCredentials.authToken);
            client.messages.create({body:`Hi ${results.userName},your otp is ${otp}`,from :'17028325292',to:'+91'+results.phoneNo})
            let value=await dbActivity.ciphering(details);
            return res.success(otp,value);
        }
        catch(err){
            return res.failure("Sorry,encryption could not performed");
        }
    }
    async qrVerification(req,res){
        dbActivity.qrValidation();
    }
    async razorPay(req,res){
        var razorpayVar=new RazorPay({
            key_id:"rzp_test_6I5lkImHD4jVAB",
            key_secret:"1ta11B20n63KGK2xpyUy0ayr"
        });
    
    }
}
