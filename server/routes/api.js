const express = require('express');
const router = express.Router();
const testFlowerData = require('./test-flower-data.json')

/* GET api listing. */
router.get('/', (req, res) => {
  res.header(("Content-Type",'application/json'));
  res.send(JSON.stringify(testFlowerData));
});

module.exports = router;