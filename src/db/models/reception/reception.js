const mongoose = require("mongoose");

const { Schema } = mongoose;

const reсShema = new Schema({
    name: String,
    doctor: String,
    data: String,
    complaint: String
  });

module.exports = Reception = mongoose.model("reseptions", reсShema);