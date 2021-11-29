const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();
const pollinatorDataFinal = require('./pollinatorData_model.js');
const adviceData = require('./adviceData_model.js');
const infoData = require('./infoData_model.js');
// const minTempDataGeo = require('./minTempGeo_model.js');
const minTempData = require('./minTemp_model.js');
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
      pollinatorDataFinal.find({/*"Habit" : req.query.Habit,*/
                  [req.query.SoilQueryType] : req.query.Soil, 
                  [req.query.ShadeQueryType] : req.query.Shade, 
                  [req.query.PHQueryType] : req.query.PH, 
                  [req.query.FloweringQueryType] : req.query.Flowering,
                  [req.query.HardinessQueryType] : req.query.Hardiness}).then(function(result, err){
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

//For the moment we are using a normal jile rather than geojson as geojson seems to
//trigger mongodb to assume we are using longitude and latitude and then throw an out of bounds err
//Get hardiness data
// router.get('/minTempData', function (req, res, next) {
//   minTempDataGeo.find(
//     {
//        loc: {
//          $near: {
//            $geometry: {
//               type: "Point" ,
//               coordinates: [ req.query.x , req.query.y ]
//            },
//          }
//        }
//     })
//     //Limit the response to 1
//     .limit(1)
//     .then(function(result, err){
//       if(result){
//         res.send(result.properties.hardiness);
//       }
//       if(err){
//         console.log(err);
//       }
//     }
//   ); 
// });

//Get info box data
router.get('/minTempData', function (req, res, next) {
  //This rounds our coordinate up to the nearest coordinate understood by our database
  //Under this system, the coordinate given is rounded up or down to this grid reference it is 
  //closest to. The grids are spread by 5km or 5000 meters, starting at y=-197500m, x=-197500m.
  //2500 and -2500 are both coordinates used. 1 would be allocated to 2500, 0 would be allocated to -2500.
  //Similarly 5001 would be allocated to 7500, 5000 would be allocated to 2500.
  //***** Check bottom and top bounds
  var varX = Math.ceil(req.query.x/5000)*5000 - 2500;
  var varY = Math.ceil(req.query.y/5000)*5000 - 2500;
  minTempData.find({x : varX, y : varY}).then(function(result, err){
    if(result){
      res.send(result);
    }
    if(err){
      console.log(err);
    }
}); 
});

// Add a new set of user info to the database
router.post('/userData', function (req, res, next) {
  ourData.create(req).then(function(ourData){ // creates & saves to DB
    res.send(ourData);
  }).catch(next);
});

module.exports = router;

