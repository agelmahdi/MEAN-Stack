const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

router.post('/register',(req, res, next)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    console.log('Data: '+req.body.name);
    User.addUser(newUser,(err, user)=>{
        if(err){
            res.json({success: false, message:'Faild to register user'})
        }
        else{
            res.json({success: true, message:'User register'})
        }
    })

});

router.post('/auth',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username,(err, user)=>{
        if(err) throw err;
        if(!user){
            res.json({success: false, message:'Faild to find user'})
        }
        console.log(user)
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret,{
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'Bearer '+token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else{
                return  res.json({success: false, message:'Wrong Password'})

            }

       
        });
    });
});

router.get('/profile',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
    res.json({user: req.user});
});

module.exports = router;