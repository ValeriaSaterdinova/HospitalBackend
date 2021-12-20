const mongoose = require("mongoose");

const { Schema } = mongoose;

const logShema = new Schema({
  login: String,
  password: String
});

module.exports = User = mongoose.model('users', logShema);