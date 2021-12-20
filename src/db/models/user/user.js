const mongoose = require("mongoose");

const { Schema } = mongoose;

const logShema = new Schema({
  login: {type: String, unique: true, required: true },
  password: {type: String, required: true }
});

module.exports = User = mongoose.model('users', logShema);