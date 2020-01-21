var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

app.route('/login').get(function(req, res, next){
    req.name = req.query.username + " " + req.query.password;
    res.json({"name": req.name});
    next();
}).post(function(req, res, next){
    res.json({"username" : req.body.username,
              "password": req.body.password});
    next();
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
