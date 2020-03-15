const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middlewares/cors'));
app.use(logger('dev'));
app.use(validator());
app.use(require('./middlewares/session'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./utils/init-api')(app);
app.use('/', require('./routes/index'));

app.use(require('./middlewares/errors'));

module.exports = app;
