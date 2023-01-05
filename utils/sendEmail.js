import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config()

const sendEmail = async (subject, message, send_to, send_from ) => {
  
  let transporter = nodemailer.createTransport({
   // host: process.env.EMAIL_HOST,
   // port: 587,
   // secure: false, // true for 465, false for other ports
   service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
    // tls: {
    //   rejectUnauthorized: false, // true for 465, false for other ports
    // }
  });

  const options = {
    from: send_from,
    to: send_to,
    subject: subject,
    html: message
  }

  transporter.sendMail(options, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result)
    }
  });
}
export default sendEmail