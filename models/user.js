const mongoose = require('mongoose');

// User Schema ===================

let Schema = mongoose.Schema;


let UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: String,
    phone: [Number],
    firstName: String,
    LastName: String,
});

let User = mongoose.model('User', UserSchema);

// Functions ====================

let createUserAndSave = function(userData, done){
  let newUser = new User(userData);
  newUser.save(function(err, data){
      if(err) return done(err);
      return done(null, data);
  });
}

let deteleUser = function(userId, done){
  User.findByIdAndRemove(userId, function(err, data){
    if(err) return done(err);
    return done(null, data);
  })
}

let findUserByUsernameAndPassword = function(loginData, done){
  User.findOne({username: loginData.username, password: loginData.password}, 
function(err, data){
    if(err) return done(err);
    return done(null, data);
  })
}




exports.UserModel = User;
exports.createUserAndSave = createUserAndSave;
exports.deteleUser = deteleUser;
exports.findUserByUsernameAndPassword = findUserByUsernameAndPassword;