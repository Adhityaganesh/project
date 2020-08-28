import nodeMailer from 'nodemailer';
import {createLogger,transports} from 'winston';
import jwt from 'jsonwebtoken';

global.jwt=jwt;

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
        jwt.sign({ data }, "secretkey", { expiresIn: "50m" }, (err, token) => {
            if (err) {
                module.exports.jwtErr = err;
            } else {

                module.exports.jwtRes = token;
            }
        });
    }
}