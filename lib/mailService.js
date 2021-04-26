'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// async..await is not allowed in global scope, must use a wrapper
function sendEmail(email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    service: 'Gmail',
    auth: {
      user: 'yaddaexam@gmail.com', //process.env.GMAIL_USER,
      pass: 'yadda123!', //process.env.GMAIL_PASSWORD,
    },
  });

  const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

  jwt.sign(
    {
      user: email,
    },
    EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      const url = `http://localhost:3000/confirmation/${emailToken}`;

      transporter.sendMail({
        to: 'suwbyllrqclerulrqc@wqcefp.com',
        from: '"YADDA YADDA ADMIN 👻" <yaddaexam@gmail.com>', // sender address
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    }
  );

  /*   // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"YADDA YADDA ADMIN 👻" <yaddaexam@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Activate account', // Subject line
    text: 'CONFIRM MAIL ', // plain text body
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
  }); */

  //}

  //console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail().catch(console.error);

module.exports = sendEmail();
