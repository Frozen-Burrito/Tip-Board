if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' });
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const twilioNumber = process.env.TWILIO_NUMBER;
const testNumber = process.env.TEST_NUMBER;

client.messages
  .create({
    body: 'Is this a message?',
    from: twilioNumber,
    to: testNumber
  })
  .then(message => console.log(message.sid));