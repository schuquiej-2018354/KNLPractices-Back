'use strict'

const questionController = require('./question.controller');
const express = require('express');
const api = express.Router();

api.get('/test', questionController.test);
api.post('/add', questionController.add);
api.put('/update/:id', questionController.update);
api.delete('/delete/:id', questionController.delete);
api.get('/get', questionController.get);
api.get('/getById/:id', questionController.getById);
api.get('/getByReports', questionController.getByReports);
api.put('/report/:id', questionController.report);

module.exports = api;