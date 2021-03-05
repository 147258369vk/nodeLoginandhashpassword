require('../model/userModel');
require('../config/passportConfig');
const mongoose = require('mongoose');
const passport = require('passport');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');

module.exports.addUser=(req,res)=>{
    var newUser=new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    });

    return newUser.save().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'New user Created',
            user:docs
        });
    })
    .catch((err)=>{
        res.status(401).json({
            success:false,
            message:'Error in creating new User',
            error:err.message
        });
    });
};

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({id:user._id},
                "ABC123",
                {
                    expiresIn:"20m"
                })
        })
        if(info) return res.status(401).json(info);
    })(req,res,next);
}