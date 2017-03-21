var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var memos = require('./routes/memos')

var app = express();

app.use(logger('dev'))
mongoose.promise = global.promise
mongoose.connect('mongodb://localhost/api-crud');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000)

app.use('/api/memo', memos);

module.exports = app
