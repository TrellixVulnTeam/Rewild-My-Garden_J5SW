const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();
const unfinishedPollinatorData = require('./unfinishedPollinatorData_model.js');
const adviceData = require('./adviceData_model.js');
const infoData = require('./infoData_model.js');
const cors = require("cors");

//Options to stop this API from being accessible by everyone one is live
//WHEN LIVE CHANGE ORIGIN FROM * TO SITE DOMAIN
const corsOptions = {
	origin: "*",
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

router.use(cors(corsOptions));
router.use(bodyParser.json());

// Get filtered entries from PFAF-TestDataMinimal
router.get('/minimalTestDataFilter', function (req, res, next) {
  //We are relying on the fact that all requests will be emitted by the front end, and therefore shouldn't
  //need parsing. However, providing some checking might be worth thinking about?
  //Because the column we're querying changes, the name of the column is also part of the request
  //"Habit" is commented out because we ultimately decided to split the database by habit- it therefore isn't useful
      unfinishedPollinatorData.find({/*"Habit" : req.query.Habit,*/
                  [req.query.SoilQueryType] : req.query.Soil, 
                  [req.query.ShadeQueryType] : req.query.Shade, 
                  [req.query.PHQueryType] : req.query.PH, 
                  [req.query.FloweringQueryType] : req.query.Flowering}).then(function(result, err){
      if(result){
        res.send(result);
      }
      if(err){
        console.log(err);
      }
    }); 
  });

//Get advice box data
router.get('/adviceData', function (req, res, next) {
    adviceData.find({[req.query.SizeQueryType] : req.query.Size}).then(function(result, err){
    if(result){
      res.send(result);
    }
    if(err){
      console.log(err);
    }
  }); 
});

//Get info box data
router.get('/infoData', function (req, res, next) {
  infoData.find({[req.query.SizeQueryType] : req.query.Size}).then(function(result, err){
  if(result){
    res.send(result);
  }
  if(err){
    console.log(err);
  }
}); 
});

module.exports = router;

