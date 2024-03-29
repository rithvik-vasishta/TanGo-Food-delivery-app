const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport=require('../middleware/passport');
const HttpError = require('http-errors');

//getting app
const app = express();

//setup logger
if(config.env=='development'){
    app.use(logger('dev'));
}

//get dist folder
const distDir = path.join(__dirname, "../../dist");

//use dist folder as hostin folder
app.use(express.static(distDir));

//parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

//secure app
app.use(helmet());

//allow cors
app.use(cors());


//authenticate
app.use(passport.initialize());

//api routes---added / at th end of api
app.use('/api/',routes);

//serve index.html
app.get('*',(req,res)=>res.sendFile(path.join(distDir,'index.html')));

//handling 404
app.use((req,res,next)=>{
    const error = new HttpError(404);
    return next(error);
});


//error handler
app.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;