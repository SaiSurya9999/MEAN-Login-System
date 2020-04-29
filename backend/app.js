//GITHUB PUBLIC REPOSITORY COPY
//Imports
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
//Creation of Express App
const app = express();
const auth = require('../backend/security/authGuard');

//Connecting to Mongoose (Place your MongoDB connection string here)
mongoose.connect('YOUR MONGO DB CONNECTION STRING PASTE IT HERE', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to Shaw.");
}).catch((error) => {
  console.log("Connection Failed: " + error);
});

const Post = require('./models/post');

const bodyParser = require('body-parser');
//CORS ERROR PATCH
app.use(cors());
app.use(bodyParser.json());

//Register users with unique email validater
app.post('/api/signup', (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new Post({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        result: true,
        details: result
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        result: false,
        details: "Email already Exist."
      })
    })
  }).catch(err => {
    console.log(err);

  })

}, err => {
  res.status(500).json({
    result: false
  });
});

//Login Validation with Credentials and Issue token
app.post('/api/login', (req, res, next) => {
  console.log(req.body);
  let fetchedUser;
  Post.findOne({ email: req.body.email }).then(result => {
      console.log(req.body.password + "||" + result.password);

      if (!result) {
          return res.status(401).json({
              messege: "Authorization Failed..!!",
              result: result
          });
      }
      fetchedUser = result;
      return bcrypt.compare(req.body.password, result.password);
  }).then(result => {
      if (!result) {
          return res.status(401).json({
              messege: "Authorization Failed..!!",
              result: "false"
          });
      }
      //Creation of Token Since Credentials are matched
      const payload = {
          email: fetchedUser.email
      };
      //Secret key to issue JWT token
      const secret = "kadndak#$%^&*dfreqofn2oa2141341";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      //Sending Token
      res.status(200).json({
          messege: "Authorization Success..!!",
          token: token,
          result: "true"
      });

  }).catch(err => {
      console.log(err);
      res.status(401).json({
          messege: "Authorization Failed..!!",
          result: "false"
      });
  });

});

//Login Validation with token for (Angular Route Guard) Note: Input Token as header
app.get('/api/validation', (req, res, next) => {
  console.log(req.body);
  token =  req.headers.authorization;
    console.log(token);
    const secret = "kadndak#$%^&*dfreqofn2oa2141341";
    try {
        let payload = jwt.verify(token, secret);
        console.log(payload);
            res.status(200).json({
                result: true,
                payload: jwt.verify(token, secret) 
             });
        
       
    }catch{
        res.status(401).json({
            result: false
         });
    }
   
 }, err => {
     console.log(err);
     res.status(500).json({
       result: false
     });
});

//Protected API Endpoint
app.get('/api/secured-data', auth, (req,res) => {
  res.status(200).json({
    data: "This is Confidential data from Node Js Protected API Endpoint"
  });
}, err => {
 console.log(err);
 res.status(401).json({
   data: "You are not authorized to use this Node Js Protected API Endpoint"
 });
});

//Angular App Hosting Production Build
app.use(express.static(__dirname + '/dist/login'));

// For all GET requests, send back index.html (PathLocationStrategy) (Refresh Error)
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/dist/login/index.html'));
});

app.use('/*', (req, res, next) => {
  res.status(400).json({
    messege: "Link is Incorrect..!!"
  })
  next();
});
//Exporting Express app for importing in node server script
module.exports = app;