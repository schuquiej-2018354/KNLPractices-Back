'use strict'

const questionController = require('./question.controller');
const express = require('express');
const api = express.Router();

api.get('/test', questionController.test);
api.post('/add', questionController.add);
api.put('/update/:id', questionController.update);
api.delete('/delete/:id', questionController.delete);

module.exports = api;