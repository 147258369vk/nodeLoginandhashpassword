require('./config/db');
var express = require('express');
var bodyparser=require('body-parser');
var apiroutes=require('./routes/userRoutes');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/',apiroutes);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('Server is running at http://localhost:'+port);
});

