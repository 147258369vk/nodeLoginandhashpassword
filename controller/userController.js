require('../model/userModel');
require('../config/passportConfig');
const mongoose = require('mongoose');
const passport = require('passport');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');
const _ = require('lodash');

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
            "token":user.generateJWT(),
                data:user
        })
        if(info) return res.status(401).json(info);
    })(req,res,next);
}

module.exports.userProfile=(req,res)=>{
    User.findOne({_id:req._id}).then((user)=>{
        return res.status(200).json({
            success:true,
            message:'user Found',
            data:_.pick(user,['email'])
        })
    }).catch((err)=>{
        res.status(404).json({
            success:false,
            message:'user not found',
            err:err.message
        })
    })
}