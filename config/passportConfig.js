var passport = require('passport');
var localPassport = require('passport-local').Strategy;
require('../model/userModel');

const mongoose = require('mongoose');

var User = mongoose.model('user');

passport.use(
    new localPassport({usernameField:'email'},
    (username,password,done)=>{
        User.findOne({email:username},
            (err,user)=>{
                if(err)
                return done(err);
                else if(!user)
                return done(null,false,{message:'username is not registered'});
                else if(!user.verifyPassword(password))
                return done(null,false,{message:'wrong password'})
                else
                return done(null,user);
            });
    })
);
