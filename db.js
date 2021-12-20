//This file is used to establish our database
require('dotenv/config') // require the dotenv/config at beginning of file
const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB,
  DATABASE_URL
} = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const url = `${DATABASE_URL}`;

mongoose.connect(url, options).then(function () {
  console.log('MongoDB is connected');
})
  .catch(function (err) {
    console.log(err);
});