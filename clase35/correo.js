import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

// node correo.js micorreo@gmail.com "prueba" "hola mundo"


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

function createSendMailGmail() {
  return createSendMail({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    }
  })
}

//const sendMail = createSendMailEthereal();
const sendMail = createSendMailGmail();

const emailAccount = process.argv[2] || 'mail@example.com';
const emailSubject = process.argv[3] || 'Bienvenida a CH';
const emailText = process.argv[4] || 'Hola, te damos bienvenida a la plataforma Coderhouse :)';
const attachmentsPath = '';
const emailAttachments = [
  {
    path: new URL('./foto.png', import.meta.url).pathname
  }
];

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