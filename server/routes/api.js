require('dotenv/config') // require the dotenv/config at beginning of file
const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();
const pollinatorDataFinal = require('./pollinatorData_model.js');
// const adviceData = require('./adviceData_model.js');
// const infoData = require('./infoData_model.js');
const adviceFinal = require('./adviceFinal_model.js');
const infoFinal = require('./infoFinal_model.js');
const minTempData = require('./minTemp_model.js');
const userData = require('./userData_model.js');
const cors = require("cors");
const nodemailer = require("nodemailer");

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
      pollinatorDataFinal.find({
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
    adviceFinal.find({[req.query.SizeQueryType] : req.query.Size, 
      [req.query.ChildFriendlyQuery] : req.query.ChildFriendlyResponse, 
      [req.query.CheapQuery] : req.query.CheapResponse,
      [req.query.EasyQuery] : req.query.EasyResponse, 
      [req.query.RentingQuery] : req.query.RentingResponse,
      [req.query.PavedGardensQuery] : req.query.PavedGardensResponse}).then(function(result, err){
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
  infoFinal.find({[req.query.SizeQueryType] : req.query.Size}).then(function(result, err){
    if(result){
      res.send(result);
    }
    if(err){
      console.log(err);
    }
  }); 
});

//Get info box data
router.get('/minTempData', function (req, res, next) {
  //This rounds our coordinate up to the nearest coordinate understood by our database
  //Under this system, the coordinate given is rounded up or down to this grid reference it is 
  //closest to. The grids are spread by 5 km or 5000 meters, starting at y=-197500m, x=-197500m.
  //2500 and -2500 are both coordinates used. 1 would be allocated to 2500, 0 would be allocated to -2500.
  //Similarly, 5001 would be allocated to 7500, 5000 would be allocated to 2500.
  //***** Check bottom and top bounds
    const varX = Math.ceil(req.query.x / 5000) * 5000 - 2500;
    const varY = Math.ceil(req.query.y / 5000) * 5000 - 2500;
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
  userData.create(req.body).then(function(userData){ // creates & saves to DB
    res.send(userData);
  }).catch(next);
});

// Get other users who are within 
router.get('/userData', function (req, res, next) {
  userData.find(
    {
      geometry: {
         $near: {
           $geometry: { type: "Point" , coordinates: [ req.query.Longitude , req.query.Latitude ] },
           //When specifying a GeoJSON point, you can use the optional $minDistance and $maxDistance specifications to limit the $near results by distance in meters
           $maxDistance: req.query.Distance,
         }
       }
    })
    .then(function(result, err){
      if(result){
        res.send(result);
      }
      if(err){
        console.log(err);
      }
    }
  ); 
});

// Code for emailing users
// gmail is probably not the best email provider to use as it is twitchy about blocking emails
// that it things look spammy- but will probably work temporarily on our small scale
// ********** It may be worth putting this in another file when we have time- it shouldn't be with the apis
// This can be tested in postman by using http://localhost:3000/api/sendmail and editing the body in x-www-form-urlencoded
const {
  SENDER_EMAIL,
  SENDER_PASSWORD,
} = process.env;

const sendMail = (emailInfo, callback) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  });

  const mailOptions = {
    from: SENDER_EMAIL,
    to: `<${emailInfo.email}>`,
    subject: 'Your Rewild My Garden Results',
    html: `${emailInfo.emailBody}`
  };
  
  transporter.sendMail(mailOptions, callback);
}

router.use(
  express.urlencoded({
    extended: true
  })
)

router.post("/sendmail", (req, res) => {
  let emailInfo = req.body;
  sendMail(emailInfo, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      res.send(info);
    }
  });
});

module.exports = router;

