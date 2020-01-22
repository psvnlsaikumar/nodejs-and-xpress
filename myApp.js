const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose'); 
const UserModel = require('./models/user');

// --> 7)  Mount the Logger middleware here


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use(function(req, res, next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
}, express.static(__dirname + '/public'));



app.use('/json', function(req, res){
  let message = "Hello json";
  if(process.env.MESSAGE_STYLE == `uppercase`){
        message = message.toUpperCase();
  }
  res.json({"message": message});
})

app.use('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({'time' : req.time});
});

app.get('/:word/echo', function(req, res){
    res.json({"echo": req.params.word});
});

app.route('/login').post(function(req, res, next){
    UserModel.findUserByUsernameAndPassword({"username": req.body.username
                                              ,"password": req.body.password}, 
function(err, data){
        if(err){
          res.json({success: 0});
          console.log(err);
        } 
        res.json({success: 1});
        next();
    })
});

app.route('/signup').post((req, res, next) => {
  UserModel.createUserAndSave({"username": req.body.username,
                               "password": req.body.password,
                               "firstname": req.body.firstname,
                               "lastname": req.body.lastname,
                               "phone": req.body.phone,
                               "email": req.body.email
                              }, function(err, data){
    if(err) {
      res.json({success: 0});
      console.log(err);
    }
    res.json(data);
    next();
  })
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
