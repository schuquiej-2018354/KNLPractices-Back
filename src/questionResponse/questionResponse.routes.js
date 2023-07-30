'use strict'

const express = require('express');
const api = express.Router();
const questionResponseController = require('./questionResponse.controller');

api.get('/getByQuestion/:id', questionResponseController.getByQuestion);
api.post('/add', questionResponseController.add);
api.delete('/delete/:id', questionResponseController.delete)

module.exports = api;