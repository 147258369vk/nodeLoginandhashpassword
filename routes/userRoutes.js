var express = require('express');

var userCtrl = require('../controller/userController');

var routes=express.Router();

routes.post('/newUser',userCtrl.addUser);
routes.post('/auth',userCtrl.authenticate);
module.exports = routes;
