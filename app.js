const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

app.use(cors());

const apiRoutes = require("./src/modules/routes/routes");

const url = 'mongodb+srv://ValeriaSaterdinova:restart987*@education.cssf9.mongodb.net/Hospital?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log('Successfully!');
});
