import response from '../../helper';
import config from '../../config.json';
import qrcode from 'qrcode';
export default class dbActivity {
    async accountCreation(details) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.collection("customerDetails").findOne({"emailAddress":details.emailAddress},async(err,results)=>{
                    if(results==null)
                    {
                       await db.collection('customerDetails').insertOne(details,async(err)=>{
                            await response.mailSender(config.mailCredentials.userName, config.mailCredentials.password, config.mailCredentials.from,details.emailAddress,'Account Creation',`Greetings ${details.userName},Welcome to cyberHub`);
                            return resolve("Account created successfully");
                        })
                    }
                    else{
                        return reject('Sorry emailAddress already taken');
                    } 
                });
            }
            catch (err) {
                return reject('sorry,cannot perform the requested operation')
            }
        })
    }
    login(userName, password) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.collection("customerDetails").findOne({"userName":userName,"password":(password)}, async (err, results) => {
                    if (err) {
                        throw err;
                    }
                    else if(results==undefined){
                        return reject('Sorry,no such user');
                    }
                    global.results=results;
                    return resolve('Login Successful');
                })
            }
            catch (err) {
                return reject('sorry,cannot perform the requested operation')
            }
        }
        )
    }
    async ciphering(data){
        return new Promise(async(resolve,reject)=>{
            if(results==undefined){
                return reject('Please login to continue');
            }
            await response.jwtSign(data);
            let token=response.jwtRes;
            return resolve(token);
        })
    }
    async verify(req,res,data){
        global.data=data;
       let value=await db.collection("customerDetails").findOne(data);
       if(value==null){
           return res.failure("Sorry,wrong credentials");
       }
       return res.success("Verification successful");
    }
    async qrValidation(){
        let str;
        const promise=qrcode.toDataURL(data).then(res=>{str=res.substr(0,25)});
        console.log(str);
        return res.success("Hello")
    }

}


module.exports = dbActivity;


























