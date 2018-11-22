const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'LightBlog', cookie:{maxAge: 60000}, resave:false, saveUninitialized:false}));

(if(!isProduction)) {
  app.use(errorHandler());
}

mongoose.connect('mongodb://localhost/lightblog');
mongoose.set('debug',true);
