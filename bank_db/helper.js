const nodeMailer = require('nodemailer');
const {createLogger,transports} = require('winston');
const jwt = require('jsonwebtoken');
let token;

module.exports = {
    mailSender: (userName, password, fromEmail, toEmail, subjectText, mailText) => {
        let transporter = nodeMailer.createTransport({

            service: "Gmail",
            auth: {
                user: userName,
                pass: password
            }
        });
        let mailOptions = {

            from: fromEmail,
            to: toEmail,

            subject: subjectText,
            text: mailText
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Email sent " + info.response);
            }
        })
    },
    logger: createLogger({
        level: 'info',
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'app.log', level: 'error', options: { flags: 'w' } }),
            new transports.File({ filename: 'app.alllogs.log', options: { flags: 'w' } })
        ]
    }),
    jwtSign: (data) => {
        token = jwt.sign({data},"secretkey",{expiresIn:"50m"});
        return token;
    },
    jwtVerify : (data) => {
        console.log(data);
        let value = jwt.verify(data,"secretkey");
        return value;
    }
}