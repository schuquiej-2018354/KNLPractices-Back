'use strict'

const careerController = require('./career.controller')
const express = require('express')
const api = express.Router();

api.get('/test', careerController.test);
api.get('/get', careerController.get);
api.post('/add', careerController.add)
api.put('/update/:id', careerController.update)
api.delete('/delete/:id', careerController.delete)


module.exports = api