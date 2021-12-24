const mongoose = require("mongoose");

const { Schema } = mongoose;

const reсShema = new Schema({
  name: String,
  doctor: String,
  date: String,
  complaints: String,
  userId:String
});

module.exports = Reception = mongoose.model("reseptions", reсShema);