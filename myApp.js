
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here




app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(__dirname + '/public'));


app.use('/json', function(req, res){
  res.json({"message": "Hello json"});
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
