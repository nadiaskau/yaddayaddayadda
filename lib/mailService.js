'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  let user = process.env.GMAIL_USER;
  console.log(user);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    service: 'Gmail',
    auth: {
      user: 'yaddaexam@gmail.com', //process.env.GMAIL_USER,
      pass: 'yadda123!', //process.env.GMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"YADDA YADDA ADMIN 👻" <yaddaexam@gmail.com>', // sender address
    to: 'efsnsysurlrwfqxuot@twzhhq.com, efsnsysurlrwfqxuot@twzhhq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<h1>Hello Header</h1><b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
