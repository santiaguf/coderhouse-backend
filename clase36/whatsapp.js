import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';

// node whatsapp.js +5491123456789 "Hola coder desde nodejs"

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

try {
  const message = await client.messages.create({
    body: process.argv[3],
    mediaUrl: [ 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png' ],
    from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
    to: `whatsapp:${process.argv[2]}`
  })
  console.log(message.sid);
} catch (error) {
  console.log(error);
}