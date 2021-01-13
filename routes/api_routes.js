const express = require('express');
const twilio = require('twilio');
const BoardGame = require('../models/boardGame');
const randomNumber = require('../helpers/randomNumber');

const router = express.Router()

router.post('/tip', async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  const twilioNumber = process.env.TWILIO_NUMBER;

  try {
    const games = await BoardGame.find();
    const boardGame = games[randomNumber(0, games.length)];

    const message = await client.messages.create({
      body: `${boardGame.name} - Max players: ${boardGame.numOfPlayers}`,
      from: twilioNumber,
      to: req.body.phone_number
    });

    console.log(`The message to ${req.body.phone_number} was sent!`);

    res.render('messageSent');

  } catch (error) {
    console.log('An error occurred while sending a message: ', error);
  }
});

router.post('/game', async (req, res) => {
  try {
    const newGame = await BoardGame.create(req.body);
    console.log(req.body);
    return res.status(200).json({
      success: true,
      game: newGame
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
});

module.exports = router;