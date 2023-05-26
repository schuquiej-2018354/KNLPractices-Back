'use strict'

const userController = require('./user.controller');
const express = require('express');
const api = express.Router();

api.get('/test', userController.test);
api.post('/add', userController.add);
api.put('/update/:id', userController.update);
api.delete('/delete/:id', userController.delete);

module.exports = api;