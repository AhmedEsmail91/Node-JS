import nodemailer from "nodemailer";
import { emailTemplete } from "./emailTemplete.js";
export const sendEmail =async(token,sendtoEmail)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eng.ahmed.esmail.19@gmail.com',
            pass: 'orpebxjlmuionmhy'
        }
    });
    const url=`http://localhost:3000/api/verifyEmail/${token}`;
    const info=await transporter.sendMail({
        from: '"Node JS Sara7a App"<eng.ahmed.esmail.19@gmail.com>',
        to: sendtoEmail,
        subject: "Hello",
        // text: "Hello world?",
        html: emailTemplete(url)
    });
    console.log("Message sent: %s", info.messageId);
};