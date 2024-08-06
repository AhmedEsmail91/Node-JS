import nodemailer from "nodemailer";
export const sendEmail =async()=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eng.ahmed.esmail.19@gmail.com',
            pass: 'orpebxjlmuionmhy'
        }
    });
    const info=await transporter.sendMail({
        from: '"Node JS Sara7a App"<eng.ahmed.esmail.19@gmail.com>',
        to: "ahmed.esmail.9102@gmail.com",
        subject: "Hello",
        // text: "Hello world?",
        html: "<a href='http://localhost:3000/'>VerifyEmail</a>"
    });
    console.log("Message sent: %s", info.messageId);
};