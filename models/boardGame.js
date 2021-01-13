const { Schema, model } = require('mongoose');

const BoardGameSchema = new Schema({
  name: String,
  numOfPlayers: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('board_game', BoardGameSchema);