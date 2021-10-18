const express = require('express');
const router = express.Router();
const gardenData = require('../../data/PFAF-Garden-Data.json')

/* GET api listing. */
router.get('/', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(gardenData));
})

module.exports = router;