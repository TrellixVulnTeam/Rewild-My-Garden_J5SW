const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();
const unfinishedPollinatorData = require('./unfinishedPollinatorData_model.js');
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

module.exports = router;







// NOTES 

// You can create routes folder to organise your similar routes

// //This is 'middleware', used to log the address hit and the date and time it was hit
// const moment = require('moment');
// const logger = (req, res, next) => {
//   console.log(
//     `${req.protocol}://${req.get('host')}${
//       req.originalUrl
//     }: ${moment().format()}`
//   );
//   next();
// };
// app.use(logger);

// Parsers for POST data
//A bodyparser is used to parse the data in the body of a request. "bodyparser" is crossed out because that syntax isn't
//needed any more, and we could just put "app.use(express.json())" "and app.use(express.urlencoded({extended: false}))"
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//You can also use .get to access data from a json. You can using special sytax to access an individual member from a json.
//You can also use an if/else to see if a user has entered bad input, and return a 400 if they have
//FOR INSTANCE:
//
//        Gets All Members:
// router.get('/', (req, res) => res.json(members));
//
//         Get Single Member:
// router.get('/:id', (req, res) => {
//   const found = members.some(idFilter(req));
//   if (found) {
//     res.json(members.filter(idFilter(req)));
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });
//
//app.post would be used to add something, or add to a database. app.put would be used to edit something. app.delete would be used to delete something.
//FOR INSTANCE:
//
//          Create Member:
// router.post('/', (req, res) => {
//   const newMember = {
//     ...req.body,
//     // "uuid" is a standin beause we're not connected to a database- it just generates random ids
//     id: uuid.v4(),
//     status: 'active'
//   };
//   if (!newMember.name || !newMember.email) {
//      // We don't need 'else' here because of the return
//     return res.status(400).json({ msg: 'Please include a name and email' });
//   }
//   // If you were using mongoDb here, you would use syntax like "members.save(newMember)" rather than just pushing
//   members.push(newMember);
//   res.json(members);
//   // res.redirect('/');
// });
//
//          Update Member:
// router.put('/:id', (req, res) => {
//   const found = members.some(idFilter(req));
//   if (found) {
//     members.forEach((member, i) => {
//       if (idFilter(req)(member)) {
//         const updMember = {...member, ...req.body};
//         members[i] = updMember
//         res.json({ msg: 'Member updated', updMember });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });
//
//          Delete Member:
// router.delete('/:id', (req, res) => {
//   const found = members.some(idFilter(req));
//   if (found) {
//     res.json({
//       msg: 'Member deleted',
//       members: members.filter(member => !idFilter(req)(member))
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

//This didn't work because it inserted a 'documents:' before the array
// router.get('/plantData', (req, res, next) =>{  
//   plantData.find()  
//   .then(function(plantData)=>{  
//     // res.status(200).json({  
//     //   documents
//     // });  
//     res.send(plantData);
//   });  
// });  


// A SIMPLER WAY OF GOING ABOUT THIS IS USING EXPRESS HANDLEBARS

// In order to use handlebars you need to set up middleware, i.e.:
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

//You also need html files- see 'views' in https://github.com/bradtraversy/express_crash_course from
// https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia

//You can create a data 'schema'- see https://www.youtube.com/watch?v=vjf774RKrLc&ab_channel=DevEd 23:00


