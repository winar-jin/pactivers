const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schems
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

// Add a User
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password,salt,(err,hash) => {
             if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Check the password
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}


// Get User By Name
module.exports.getUserByUsername = function(name,callback){
    const query = {name: name};
    User.findOne(query,callback);
}