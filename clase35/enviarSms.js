import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

// node enviarSms.js +5491123456789 "Hola coder desde nodejs"

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const from = process.env.TWILIO_PHONE_NUMBER;
const to = process.argv[2];
const body = process.argv[3] || 'Hola coder desde nodejs';

const info = await client.messages.create({
  body, from, to });

console.log(info);