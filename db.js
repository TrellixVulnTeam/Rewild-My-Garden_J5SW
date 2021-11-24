//This file is used to establish our database
require('dotenv/config') // require the dotenv/config at beginning of file
const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB
} = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.rimay.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, options).then(function () {
  console.log('MongoDB is connected');
})
  .catch(function (err) {
    console.log(err);
});