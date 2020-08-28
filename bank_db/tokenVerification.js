const response=require("./helper");

function tokenVerify(req,res,next){
    response.jwt.verify(req.token,'secretkey',async(err)=>{
        if(err){
            res.sendStatus(403);
        };
        return next();
    })
}
module.exports.tokenVerify=tokenVerify;