import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

function createSendMail(mailConfig) {
  const transporter = nodemailer.createTransport(mailConfig);

  return function sendMail({ to, subject, text, html, attachments }) {
    const mailOptions = { from: mailConfig.auth.user, to, subject, text, html, attachments };
    return transporter.sendMail(mailOptions);
  };
}


function createSendMailEthereal() {
  return createSendMail({
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    auth: {
      user: process.env.ETHEREAL_USERNAME,
      pass: process.env.ETHEREAL_PASSWORD,
    }
  })
}

const sendMail = createSendMailEthereal();

const emailAccount = 'plataforma@coderhouse.com';
const emailSubject = 'Bienvenida a CH';
const emailText = 'Hola, te damos bienvenida a la plataforma Coderhouse :)';
const attachmentsPath = '';
const emailAttachments = [];

if(attachmentsPath) {
  emailAttachments.push({ path: attachmentsPath })
}

const info = await sendMail({
  to: emailAccount,
  subject: emailSubject,
  text: emailText,
  attachments: emailAttachments
});

console.log(info);