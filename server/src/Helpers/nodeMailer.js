import nodemailer from "nodemailer";

//todo : transporter to be configured for gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
}); 
  module.exports = async function mailSender({from,to,subject,html}) {
    const info = await transporter.sendMail({
      from:from, 
      to:to, 
      subject:subject,
      html:html 
    });
    if(info){
      console.log("Mail sent to https://ethereal.email/messages with id: %s", info.messageId);
      return true;
    }else{
      return false;
    }
  }
  