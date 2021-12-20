const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const logShema = new Schema({
  login: String,
  password: String
});

const reсShema = new Schema({
  name: String,
  doctor: String,
  data: String,
  complaint: String
});

const Reception = mongoose.model("reseptions", reсShema);
const User = mongoose.model('users', logShema)

const url = 'mongodb+srv://ValeriaSaterdinova:restart987*@education.cssf9.mongodb.net/Hospital?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
