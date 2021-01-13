const express = require('express');
const twilio = require('twilio');
// const BoardGame = require('../models/board_game');

const router = express.Router()

router.get('/tip/:phone_number', async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  const twilioNumber = process.env.TWILIO_NUMBER;
  
  try {
    const message = await client.messages.create({
      body: 'Hi there!',
      from: twilioNumber,
      to: req.params.phone_number
    });

    console.log(`The message with id = ${message} was sent!`);

  } catch (error) {
    console.log('An error occurred while sending a message: ', error);
  }
});

module.exports = router;