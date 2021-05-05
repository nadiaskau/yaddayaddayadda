//Inspiration and guide from: https://github.com/benawad/graphql-express-template/blob/25_confirmation_email/resolvers.js

'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.sendEmail = function (email) {
  // Transporter object - email setup
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', 
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  
//When a user registers
  jwt.sign(
    {
      user: email, 
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      const url = `http://localhost:3000/users/confirmation/${emailToken}`; //URL for confirmation

      transporter.sendMail({ 
        to: email, 
        from: `"YADDA YADDA ADMIN 👻" ${process.env.GMAIL_USER}`, 
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    }
  );

};

