'use strict'

const express = require('express');
const api = express.Router();
const questionResponseController = require('./questionResponse.controller');

api.get('/getByQuestion/:id', questionResponseController.getByQuestion);
api.post('/add', questionResponseController.add);

module.exports = api;