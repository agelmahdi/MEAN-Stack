const mongoose = require('mongoose');
const bcrypte = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUserName = function(username, callback){
    const query = { username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypte.genSalt(10,(err, salt)=>{ 
        bcrypte.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);

        })
    })
}
module.exports.comparePassword = function(candidatePassword, hash , callback){
    bcrypte.compare(candidatePassword,hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });

}