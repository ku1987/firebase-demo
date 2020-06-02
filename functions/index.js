const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/', indexRouter);

exports.app = functions.https.onRequest(app);
